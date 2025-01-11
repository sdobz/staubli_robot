import sys
import time
import terminal


def handle_char(b, delegate):
    if b == "w":
        delegate.onUp()
    elif b == "a":
        delegate.onLeft()
    elif b == "s":
        delegate.onDown()
    elif b == "d":
        delegate.onRight()
    elif b == "q":
        delegate.onQuit()


def handle_chunk(chunk, delegate):
    for b in chunk:
        handle_char(b, delegate)


def handle_input(delegate):
    with terminal.raw(sys.stdin):
        with terminal.nonblocking(sys.stdin):
            while True:
                c = sys.stdin.read(1)
                if c:
                    handle_chunk(c, delegate)
                time.sleep(0.01)
