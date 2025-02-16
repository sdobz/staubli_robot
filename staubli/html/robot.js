async function get(url) {
    return await (await fetch(url)).json()
}
async function put(url) {
    return await (await fetch(url, { method: "PUT" })).json()
}

export class Robot {
    state = {
        "position": {
            effector: {
                x: undefined,
                y: undefined,
                z: undefined,
                pitch: undefined,
                yaw: undefined,
                roll: undefined
            },
            joints: {
                j1: undefined,
                j2: undefined,
                j3: undefined,
                j4: undefined,
                j5: undefined,
                j6: undefined
            }
        },
        "distance": undefined,
        "angle_step": undefined,
        "elbow": undefined,
        "positions": undefined,
        "positions_index": undefined
    }

    async load() {
        this.state = await get("/api/robot")
    }

    async up() {
        await put("/api/up")
    }

    async down() {
        await put("/api/down")
    }

    async left() {
        await put("/api/left")
    }

    async right() {
        await put("/api/right")
    }

    async forward() {
        await put("/api/forward")
    }

    async back() {
        await put("/api/back")
    }

    async yaw_left() {
        await put("/api/yaw_left")
    }

    async yaw_right() {
        await put("/api/yaw_right")
    }

    async pitch_up() {
        await put("/api/pitch_up")
    }

    async pitch_down() {
        await put("/api/pitch_down")
    }

    async roll_left() {
        await put("/api/roll_left")
    }

    async roll_right() {
        await put("/api/roll_right")
    }

    async minus() {
        const response = await put("/api/minus")
        this.state = {
            ...this.state,
            response
        }
    }

    async plus() {
        const response = await put("/api/plus")
        this.state = {
            ...this.state,
            response
        }
    }

    async angle_minus() {
        const response = await put("/api/angle_minus")
        this.state = {
            ...this.state,
            response
        }
    }

    async angle_plus() {
        const response = await put("/api/angle_plus")
        this.state = {
            ...this.state,
            response
        }
    }

    async elbow() {
        const response = await put("/api/elbow")
        this.state = {
            ...this.state,
            response
        }
    }

    async flail() {
        await put("/api/flail")
    }

    async print_position() {
        const response = await put("/api/print_position")
        this.state = {
            ...this.state,
            response
        }
    }

    async next_position() {
        const response = await put("/api/next_position")
        this.state = {
            ...this.state,
            response
        }
    }

    async previous_position() {
        const response = await put("/api/previous_position")
        this.state = {
            ...this.state,
            response
        }
    }

    async reset() {
        await put("/api/reset")
    }
}
