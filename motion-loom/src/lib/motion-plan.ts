export interface MotionConstraint {
  maxAcceleration: number;
  maxVelocity: number;
}

/**
 * A MotionPlan
 */
export class MotionPlan {
  start: number;
  acceleration: number;
  accelerateTime: number;
  coastTime: number;

  constructor(start: number, acceleration: number, accelerateTime: number, coastTime: number) {
    this.start = start;
    this.acceleration = acceleration;
    this.accelerateTime = accelerateTime;
    this.coastTime = coastTime;
  }

  /**
   * Create a plan given the constraints
   */
  static planConstraints(constraints: MotionConstraint, start: number, stop: number) {
    const acceleration =
      start < stop ? constraints.maxAcceleration : -constraints.maxAcceleration;

    const minPosition = Math.min(start, stop);
    const maxPosition = Math.max(start, stop);
    let distanceToGo = maxPosition - minPosition;
    const maxAccelerationTime =
      constraints.maxVelocity / constraints.maxAcceleration;
    const distanceAfterMaxAcceleration =
      maxAccelerationTime * constraints.maxVelocity;

    let coastTime: number, accelerateTime: number;

    if (distanceAfterMaxAcceleration >= distanceToGo) {
      // A full acceleration period is too long, cut it off
      coastTime = 0;
      accelerateTime = Math.sqrt(distanceToGo / constraints.maxAcceleration);
    } else {
      distanceToGo -= distanceAfterMaxAcceleration;

      // The remaining distance is traversed at maxAccelerationTime
      accelerateTime = maxAccelerationTime;
      coastTime = distanceToGo / constraints.maxVelocity;
    }

    return new MotionPlan(start, acceleration, accelerateTime, coastTime);
  }

  /**
   * Create a plan that has the same ramp times but different acceleration amounts
   */
  static planSibling(plan: MotionPlan, start: number, stop: number) {
    let distanceToGo = stop - start;

    let acceleration =
      distanceToGo /
      ((plan.accelerateTime + plan.coastTime) * plan.accelerateTime);

    return new MotionPlan(
      start,
      acceleration,
      plan.accelerateTime,
      plan.coastTime
    );
  }

  static planSync(constraints: MotionConstraint, starts: number[], stops: number[]): MotionPlan[] {
    const initialPlans = starts.map((start, i) =>
      MotionPlan.planConstraints(constraints, start, stops[i]!)
    );

    let maxTime = -1;
    let maxPlan: MotionPlan;

    initialPlans.forEach((plan) => {
      const planTime = plan.totalTime();
      if (planTime < maxTime) {
        return;
      }
      maxTime = planTime;
      maxPlan = plan;
    });

    const syncPlans = initialPlans.map((replacePlan, i) => {
      if (maxPlan === replacePlan) {
        return maxPlan;
      }

      return MotionPlan.planSibling(maxPlan, starts[i]!, stops[i]!);
    });
    return syncPlans;
  }

  position(time: number) {
    if (time < this.accelerateTime) {
      const velocity = time * this.acceleration;
      return this.start + (time * velocity) / 2;
    }

    const velocity = this.acceleration * this.accelerateTime;
    time -= this.accelerateTime;
    let position = this.start + (this.accelerateTime * velocity) / 2;

    if (time < this.coastTime) {
      return position + time * velocity;
    }

    time -= this.coastTime;
    position += this.coastTime * velocity;

    time = Math.min(time, this.accelerateTime);
    const finalVelocity = velocity - this.acceleration * time;
    return (
      position + finalVelocity * time + ((velocity - finalVelocity) * time) / 2
    );
  }

  totalTime() {
    return this.accelerateTime * 2 + this.coastTime;
  }
}
