Originally forked from haugene/docker-transmission-openvpn. I only wanted the openvpn bits so the 
Transmission bits were deleted.

# OpenVPN with Lots of Built-in Configs
Docker container which runs OpenVPN.
It bundles certificates and configurations for the following VPN providers:

| Provider Name                | Config Value |
|:-----------------------------|:-------------|
| Anonine | `ANONINE` |
| BTGuard | `BTGUARD` |
| Cryptostorm | `CRYPTOSTORM` |
| FrootVPN | `FROOT` |
| FrostVPN | `FROSTVPN` |
| Giganews | `GIGANEWS` |
| HideMe | `HIDEME` |
| HideMyAss | `HIDEMYASS` |
| IntegrityVPN | `INTEGRITYVPN` |
| IPVanish | `IPVANISH` |
| Ivacy | `IVACY` |
| IVPN | `IVPN` |
| Newshosting | `NEWSHOSTING` |
| NordVPN | `NORDVPN` |
| OVPN | `OVPN` |
| Private Internet Access | `PIA` |
| PrivateVPN | `PRIVATEVPN` |
| PureVPN | `PUREVPN` |
| RA4W VPN | `RA4W` |
| SlickVPN | `SLICKVPN` |
| SmartVPN | `SMARTVPN` |
| TigerVPN | `TIGER` |
| TorGuard | `TORGUARD` |
| UsenetServerVPN | `USENETSERVER` |
| Windscribe | `WINDSCRIBE` |
| VPN.ht | `VPNHT` |
| VPNBook.com | `VPNBOOK` |
| VyprVpn | `VYPRVPN` |

## Run container from Docker registry
The container is available from the Docker registry and this is the simplest way to get it.
To run the container use this command:

```
$ docker run --privileged  -d \
              -e "OPENVPN_PROVIDER=PIA" \
              -e "OPENVPN_CONFIG=Netherlands" \
              -e "OPENVPN_USERNAME=user" \
              -e "OPENVPN_PASSWORD=pass" \
              chuckremes/openvpn-client
```

You must set the environment variables `OPENVPN_PROVIDER`, `OPENVPN_USERNAME` and `OPENVPN_PASSWORD` to provide basic connection details.

The `OPENVPN_CONFIG` is an optional variable. If no config is given, a default config will be selected for the provider you have chosen.
Find available OpenVPN configurations by looking in the openvpn folder of the GitHub repository. The value that you should use here is the filename of your chosen openvpn configuration *without* the .ovpn file extension. For example:

```
-e "OPENVPN_CONFIG=ipvanish-AT-Vienna-vie-c02"
```


### Required environment options
| Variable | Function | Example |
|----------|----------|-------|
|`OPENVPN_PROVIDER` | Sets the OpenVPN provider to use. | `OPENVPN_PROVIDER=provider`. Supported providers and their config values are listed in the table above. |
|`OPENVPN_USERNAME`|Your OpenVPN username |`OPENVPN_USERNAME=asdf`|
|`OPENVPN_PASSWORD`|Your OpenVPN password |`OPENVPN_PASSWORD=asdf`|

### Network configuration options
| Variable | Function | Example |
|----------|----------|-------|
|`OPENVPN_CONFIG` | Sets the OpenVPN endpoint to connect to. | `OPENVPN_CONFIG=UK Southampton`|
|`OPENVPN_OPTS` | Will be passed to OpenVPN on startup | See [OpenVPN doc](https://openvpn.net/index.php/open-source/documentation/manuals/65-openvpn-20x-manpage.html) |
|`LOCAL_NETWORK` | Sets the local network that should have access. | `LOCAL_NETWORK=192.168.0.0/24`|

### Local Traffic
The container supports the `LOCAL_NETWORK` environment variable. For instance if your local network uses the IP range 192.168.0.0/24 you would pass `-e LOCAL_NETWORK=192.168.0.0/24`.

## Known issues, tips and tricks

#### Use Google DNS servers
Some have encountered problems with DNS resolving inside the docker container.
This causes trouble because OpenVPN will not be able to resolve the host to connect to.
If you have this problem use dockers --dns flag to override the resolv.conf of the container.
For example use googles dns servers by adding --dns 8.8.8.8 --dns 8.8.4.4 as parameters to the usual run command.

#### Restart container if connection is lost
If the VPN connection fails or the container for any other reason loses connectivity, you want it to recover from it. One way of doing this is to set environment variable `OPENVPN_OPTS=--inactive 3600 --ping 10 --ping-exit 60` and use the --restart=always flag when starting the container. This way OpenVPN will exit if ping fails over a period of time which will stop the container and then the Docker deamon will restart it.

#### Running it on a NAS
Several popular NAS platforms supports Docker containers. You should be able to set up and configure this container using their web interfaces. Remember that you need a TUN/TAP device to run the container. To set up the device it's probably simplest to install a OpenVPN package for the NAS. This should set up the device. If not, there are some more detailed instructions below.

#### Questions?
If you are having issues with this container please submit an issue on GitHub.
Please provide logs, docker version and other information that can simplify reproducing the issue.
Using the latest stable verison of Docker is always recommended. Support for older version is on a best-effort basis.

## Adding new providers
If your VPN provider is not in the list of supported providers you could always create an issue on GitHub and see if someone could add it for you. But if you're feeling up for doing it yourself, here's a couple of pointers.

You clone this repository and create a new folder under "openvpn" where you put the .ovpn files your provider gives you. Depending on the structure of these files you need to make some adjustments. For example if they come with a ca.crt file that is referenced in the config you need to update this reference to the path it will have inside the container (which is /etc/openvpn/...). You also have to set where to look for your username/password.

There is a script called adjustConfigs.sh that could help you. After putting your .ovpn files in a folder, run that script with your folder name as parameter and it will try to do the changes descibed above. If you use it or not, reading it might give you some help in what you're looking to change in the .ovpn files.

Once you've finished modifying configs, you build the container and run it with OPENVPN_PROVIDER set to the name of the folder of configs you just created (it will be lowercased to match the folder names). And that should be it!

So, you've just added your own provider and you're feeling pretty good about it! Why don't you fork this repository, commit and push your changes and submit a pull request? Share your provider with the rest of us! :) Please submit your PR to the dev branch in that case.

### Using a custom provider

If you want to run the image with your own provider without building a new image, that is also possible. For some providers, like AirVPN, the .ovpn files are generated per user and contains credentials. They should not be added to a public image. This is what you do:

Add a new volume mount to your `docker run` command that mounts your config file:
`-v /path/to/your/config.ovpn:/etc/openvpn/custom/default.ovpn`

Then you can set `OPENVPN_PROVIDER=CUSTOM`and the container will use the config you provided. If you are using AirVPN or other provider with credentials in the config file, you still need to set `OPENVPN_USERNAME` and `OPENVPN_PASSWORD` as this is required by the startup script. They will not be read by the .ovpn file, so you can set them to whatever.

Note that you still need to modify your .ovpn file as described in the previous section. If you have an separate ca.crt file your volume mount should be a folder containing both the ca.crt and the .ovpn config.
