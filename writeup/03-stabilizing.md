# Chapters

1. [Motivation](./00-context.md)
2. [Transport & Rigging](./01-commissioning.md)
3. [Fabricating Base](./02-fabricating-base.md)
4. &gt; **[Boot Disk SD Emulation](./03-stabilizing.md)** &lt;
5. [Prototype Software](./04-prototype-requirements.md)
6. [Software Operations](./05-operating-system.md)
7. [Dependencies](./06-framework-and-dependencies.md)
8. [Implementation](./07-implementation.md)

In order to be comfortable investing in the robot I had to be confident I could get the robot booted in a timely manner.
## Boot Disk / Image

Upon delivery one major issue with the robot was the 7 minute boot time and single operating boot disk. My first priority was ensuring that I didn't have a single point of failure.

I bought a [generic floppy drive](https://www.ebay.com/itm/202382335246) and used [win32diskimager](https://win32diskimager.org/) to create an image of the boot disk, and was greeted by an error message.

Attempting to burn any of the disk images I got with the robot was also not fruitful in producing a working image. The previous owner described a laborious process of getting a good "spec" (CNC parameters) describing the motion control characteristics - how many pulses per rotation on the encoder etc, so I assume there are many incomplete and partial images.

## SCSI emulator

The previous owner described getting a SD card emulator working so I knew it was possible, but details were light. I bought a [ZuluSCSI Laptop](https://shop.rabbitholecomputing.com/products/zuluscsi-laptop-rp2040) emulator and spent quite a bit of time playing with the configuration file.

The SIO card inside the machine had to be pulled and opened every time I wanted to burn a new SD image, and it has a ton of wires and jumpers attached to it. Each attempt was... thrilling. Was it going to work after reassembly?
## Process

There were many simultaneous threads being pulled together:
1. Research on the robots specific SCSI drive configuration
2. Research on how to configure ZuluSCSI
3. Reassembling a working boot disk

Some key milestones were being able to see the same error message booting a broken disk image from a floppy and booting the same broken image from the SD card - which indicated that the scsi emulator was successfully fooling the controller.

Getting the robot to boot from a different floppy disk was also valuable. With those two it was only a few more testing iterations to get the robot booting from the SD card.

In the end after about 6 disassembly/reassembly boot cycles and a bunch of untracked floppy attempts I derived the following conclusions and got the robot booting mostly consistently:
1. The existing boot floppy "yellow" had a bad sector in the operating system and couldn't be fully imaged, but had working parameters
2. The system images were bootable but had bad parameters
3. Create a (new) working boot floppy "good spec" by starting with the bootable system image and copying just the parameters from the "yellow" boot floppy
4. ZuluSCSI expects a filesystem image named HD0.img and a zuluscsi.ini file
5. Create a system image from the "good spec" floppy
6. Expand the system image to have more room for programs
7. Ensure ZuluSCSI has external 5v power because the SCSI bus doesn't provide it (low current? busted?)


### Emulator Configuration

```
[SCSI]
Debug = 0
SelectionDelay = 255
DisableStatusLED = 0

EnableUnitAttention = 0
EnableSCSI2 = 1
EnableSelLatch = 0
EnableParity = 0
MapLunsToIDs = 0

[SCSI0]
Type = 0
TypeModifier = 0
SectorsPerTrack = 18
HeadsPerCylinder = 2
Vendor = QUANTUM
Product = 'GO_DRIVE1       '
Version = '1.0'
Serial = '                '
BlockSize = 512

```

The entire configuration (with comments) is available here: [zuluscsi.ini](./zuluscsi.ini)


## Notes

Here are the raw notes from the sessions:

Creating new img file on sd card

https://github.com/ZuluSCSI/ZuluSCSI-firmware?tab=readme-ov-file#creating-new-image-files

```
fsutil file createnew HD1.img 1073741824
```

Copied config from `ADEPT V PLUS HDD SETTINGS.xml` to `zuluscsi.ini`

Discovered SD on 2022A (blue) card is unreadable - staublified?
Was not able to boot with the SD

Test: USB power?

### Attempt 1: partial success
With usb power it "recognized" the drive as unformatted
It identified the drive status, etc
When attempting to format it started "communication timeout" etc

### Attempt 2: using the .img from the floppy
Attempted boot, after several seconds:

```
Invalid record type: SX
```

Next step:
- Attempt to format
- Attempt to pull "better" image from floppy

### Attempt 3: tweaking img
Disable compression in winimg
Copy settings from edit filesystem
Increase disk size to 100mb

```
Invalid record SX
```

http://thetechpage.mirror.kb1max.com/cgi-bin/db/db.cgi_displayItem=966
some godrive specs

### Attempt 4:
Empty formatted disk - based off yellow disk boot format?
https://fejlesztek.hu/create-a-fat-file-system-image-on-linux/

```
dd if=/dev/zero of=HD0.img count=50 bs=1M
fdisk HD0.img

Command (m for help): **o**
Building a new DOS disklabel with disk identifier 0x46ac6035.

Command (m for help): **n**
Partition type:
  p primary (0 primary, 0 extended, 4 free)
  e extended
Select (default p): **<Enter>**
Using default response p
Partition number (1-4, default 1): **<Enter>**
First sector (2048-99999, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-99999, default 99999): **<Enter>**
Using default value 99999
Partition 1 of type Linux and of size 47.8 MiB is set

Command (m for help): **t**
Selected partition 1
Hex code (type L to list all codes): **c**
Changed type of partition 'Linux' to 'W95 FAT32 (LBA)'

Command (m for help): **w**
The partition table has been altered!

Syncing disks

mkfs.vfat test.img
```


### Attempt 5:
imgflpyd.exe a HD0.img

Also experienced a read error
Going to attempt to fix the disk, but not on precious yellow disk.

Getting "good spec" disk, creating image backup
Wrote yellow to goodspec
Ran chkdsk fix
Using imgflpyd to create image
Attempt boot from chkdsk version

Invalid Record SX

Writing unmodified rosie boot image to goodspec disk
"please work" otherwise yellow disk is MAGIC

### Attempt 6:
Using `StaubliRX90\V+\FLOPPY COPIES\WHAT I AM CURRENTLY RUNNING\USE THIS! ROSIE\ROSIE.imz` burn to goodspec disk with winimage and attempt boot

SUCCESS! This image is good. Transfer to HD0.img and expand...

Used winimg to expand fs from 1.44mb to 144mb
Set scsi2 on, since the drive supported it according to the refs
Turned debug off
Enabled prefetch because SPEED BBY

SUCCESS!! It booted off c

Unfortunately the calibration is wrong.
Verified yellow disk has proper calibration

Attempting to merge them

Copied over config_c and calib from yellow disk into HD0
Still not working...
Uh?!

copied adeptsys.sys and adeptsys.cfg

Now all files that seem relevant have the same modification date
Ah invalid record SX! restoring adeptsys.sys and adeptsys.cfg from rosie.imz

Going a lil nuts here
copied rosie.spc to config_c/CFG01_14.SPC

Works!


Next: [Prototype Software](./04-prototype-requirements.md)
