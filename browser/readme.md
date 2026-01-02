html principles:

- No build step
- No package manager
- `open index.html` is useful
- Dependencies are vendored with update instructions

https://unpkg.com/three@0.173.0/

https://unpkg.com/@picocss/pico@2.0.6/css/pico.amber.css
https://unpkg.com/normalize.css@8.0.1/normalize.css

# Command Theory

The HTTP main file exposes commands in the form /api/{command}

Commands must be POSTed with {data}

Commands return a patch to RobotState

Programs are lists of commands with a {type} property, which maps to the endpoint
