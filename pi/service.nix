{ pkgs, lib, ... }: let
  staubli = import ./staubli.nix { inherit pkgs; };
  serviceName = "staubli-http";
in {
  users.users.staubli = {
    isSystemUser = true;
    group = "staubli";
    extraGroups = [ "dialout" ];
  };

  users.groups.staubli = {};

  systemd.services.${serviceName} = {
    description = "Staubli HTTP Python Service";
    after = ["network.target"];
    wants = ["network.target"];
    serviceConfig = {
      ExecStart = "${staubli.package}/bin/staubli-http";
      WorkingDirectory = "${staubli.package}";
      Restart = "always";
      User = "staubli";
      Group = "staubli";

      # allow binding port 80
      SecureBits = "keep-caps";
      AmbientCapabilities = "CAP_NET_BIND_SERVICE CAP_NET_ADMIN";
      CapabilityBoundingSet = "CAP_NET_BIND_SERVICE CAP_NET_ADMIN";
    };
    wantedBy = ["multi-user.target"];
  };
}
