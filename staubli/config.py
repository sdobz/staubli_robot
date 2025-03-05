import os

class Config:
    serial_device: str
    http_port: str

    def __init__(self, serial_device: str = "/dev/ttyUSB0", http_port: str = "80"):
        self.serial_device = serial_device
        self.http_port = http_port

    @staticmethod
    def from_env(env_file: str):
        config = Config()
        with open(env_file, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):  # Ignore empty lines and comments
                    key, value = line.split("=", 1)  # Split only at the first '='
                    prop = key.strip().lower()

                    if not hasattr(config, prop):
                        raise Exception(f"Unexpected property {key} in {env_file}")
                    setattr(
                        config, prop, value.strip().strip('"').strip("'")
                    )  # Remove spaces and quotes
        return config


def env_exists(env_file: str):
    return os.access(env_file, os.R_OK)
