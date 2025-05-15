# Staubli Control

This repo includes four components:

1. Browser based control software for the Staubli TX90 6 axis serial robot
2. Python backend to translate an http api to serial terminal commands
3. NixOS operating system and ops scripts to perform development tasks
4. A writeup of the above

## Chapters

1. [Motivation](./writeup/00-context.md)
2. [Transport & Rigging](./writeup/01-commissioning.md)
3. [Fabricating Base](./writeup/02-fabricating-base.md)
4. [Boot Disk SD Emulation](./writeup/03-stabilizing.md)
5. [Prototype Software](./writeup/04-prototype-requirements.md)
6. [Software Operations](./writeup/05-operating-system.md)
7. [Dependencies](./writeup/06-framework-and-dependencies.md)
8. [Implementation](./writeup/07-implementation.md)

## Software media

Screenshot of the robot control software in browser:

![screenshot of the software](writeup/07-implementation/overview.png)

Trajectory simulation:

https://github.com/user-attachments/assets/b8d4f3e3-3c05-4f84-905b-40f87e6f1066

## Hardware media

Robot on fabricated base with counterweight:

![picture of a yellow robot arm on a black fabricated base with a yellow concrete counterweight](writeup/02-fabricating-base/09-mounted.jpg)

Multi step path with human interaction:

https://github.com/user-attachments/assets/e8f775e8-f3c6-49d3-a50c-a1353270b132


Playback using tool offset to create an orbit effect:

https://github.com/user-attachments/assets/7325dca0-d2af-4d30-a481-9bf5befac03a



