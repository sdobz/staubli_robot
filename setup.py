from setuptools import setup, find_packages

setup(
    name="staubli",
    version="0.1",
    packages=find_packages(),
    entry_points={
        "console_scripts": [
            "staubli-http = staubli.http.main:main",
        ],
    },
    package_data = {
        'staubli': ['html/**/*'],
    }
)
