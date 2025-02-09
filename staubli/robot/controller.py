import sys
import time
from .terminal import raw, nonblocking


def handle_char(b, delegate):
    if b == "w":
        delegate.on_up()
    elif b == "s":
        delegate.on_down()
    elif b == "a":
        delegate.on_forward()
    elif b == "d":
        delegate.on_back()
    elif b == "e":
        delegate.on_left()
    elif b == "c":
        delegate.on_right()
    elif b == "j":
        delegate.on_yaw_left()
    elif b == "l":
        delegate.on_yaw_right()
    elif b == "i":
        delegate.on_pitch_down()
    elif b == "k":
        delegate.on_pitch_up()
    elif b == "u":
        delegate.on_roll_left()
    elif b == "o":
        delegate.on_roll_right()
    elif b == "q":
        delegate.on_quit()
    elif b == "-":
        delegate.on_minus()
    elif b == "=":
        delegate.on_plus()
    elif b == "_":
        delegate.on_angle_minus()
    elif b == "+":
        delegate.on_angle_plus()
    elif b == "r":
        delegate.on_reset()
    elif b == "f":
        delegate.on_flail()
    elif b == "b":
        delegate.on_elbow()
    elif b == "p":
        delegate.on_print_position()
    elif b == ".":
        delegate.on_next_position()
    elif b == ",":
        delegate.on_previous_position()


def handle_chunk(chunk, delegate):
    for b in chunk:
        handle_char(b, delegate)


def handle_input(delegate):
    with raw(sys.stdin):
        with nonblocking(sys.stdin):
            while True:
                c = sys.stdin.read(1)
                if c:
                    handle_chunk(c, delegate)
                time.sleep(0.01)
