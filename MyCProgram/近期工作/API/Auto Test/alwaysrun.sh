for i in $(seq 1 100); do 
        node CCTV/newman_cctv.js;
		node GEN2/newman_g2.js
done 