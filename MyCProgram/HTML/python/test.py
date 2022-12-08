import http.client

conn = http.client.HTTPSConnection("172.16.0.205", 10037)
payload = ''
headers = {
  'sobeyhive-http-site': 'S1',
  'sobeyhive-http-tool': 'MLWEB',
  'sobeyhive-http-system': 'Nebula',
  'sobeyhive-http-token': '4bbcdf8e908be7e60c3808a2d229d2de',
  'Content-Type': 'application/json'
}
conn.request("GET", "/CMApi/api/entity/entityrest/generatinglowbitrate?contentid=4571a821d16f0f8e17e2d9fba29247a1", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))