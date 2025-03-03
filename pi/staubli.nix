{ pkgs, ... }: let
  pythonPackages = ps: with ps; [
    pyserial
    setuptools
    # Add more dependencies here
  ];
in rec {
  env = pkgs.python3.withPackages pythonPackages;
  
  package = pkgs.python3Packages.buildPythonApplication {
    pname = "staubli";
    version = "0.1";
    src = ./..;
    propagatedBuildInputs = pythonPackages pkgs.python3Packages;
    doCheck = false;
  };
}
