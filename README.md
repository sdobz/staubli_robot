## Building a new SD image on Windows

1. Environment setup:
  a. Use WSL2 and Ubuntu and install nix
  b. Ensure you have access to `serverbox.zone`
```
$ nix store info --store ssh://serverbox.zone
```
  c. Download and install https://win32diskimager.org/


2. Remote build and note the output path (also present in `result/sd-image`)

```
$ ./build-remote.sh
/nix/store/...nixos-sd-image-...-aarch64-linux.img

# or for example
rm -f /mnt/c/Users/vince/Dropbox/StaubliRX90/raspberry-pi/nixos-sd-image-24.05.20231211.a9bf124-aarch64-linux.img
cp "$(./build-remote.sh)" /mnt/c/Users/vince/Dropbox/StaubliRX90/raspberry-pi
```

3. Use Win32DiskImager to burn the img to a micro SD
4. Boot the pi
5. Access via

```
ssh staubli
```

This tends to take about 10 minutes when on the same network as serverbox.zone
1. 3:30 to build the image
2. 5:00 to burn the SD
3. 1:30 to operate the computer