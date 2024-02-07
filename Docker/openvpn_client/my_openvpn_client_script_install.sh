docker run --privileged  -d --name my-openvpn-client-script \
              -e "OPENVPN_PROVIDER=CUSTOM" \
              -e "OPENVPN_USERNAME=user" \
              -e "OPENVPN_PASSWORD=pass" \
              -v "$(pwd)"/openvpn/:/etc/openvpn/ \
              -v "$(pwd)"/CLIENTNAME.ovpn:/etc/openvpn/custom/default.ovpn \
              -v /etc/localtime:/etc/localtime:ro \
              my-openvpn-client-app
