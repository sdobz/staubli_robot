{ pkgs, lib, ... }: let
  staubli = import ./staubli.nix { inherit pkgs; };
  serviceName = "staubli-http";
in {
  users.users.staubli = {
    isSystemUser = true;
    group = "staubli";
  };

  users.groups.staubli = {};

  systemd.services.${serviceName} = {
    description = "Staubli HTTP Python Service";
    after = ["network.target"];
    wants = ["network.target"];
    serviceConfig = {
      ExecStart = "${staubli.package}/bin/staubli-http";
      WorkingDirectory = "${staubli.package}";
      SecureBits = "keep-caps";
      AmbientCapabilities = "CAP_NET_BIND_SERVICE CAP_NET_ADMIN";
      CapabilityBoundingSet = "CAP_NET_BIND_SERVICE CAP_NET_ADMIN";
      Restart = "always";
      User = "staubli";
      Group = "staubli";
    };
    wantedBy = ["multi-user.target"];
  };
}
