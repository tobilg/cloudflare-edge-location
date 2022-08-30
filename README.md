# cloudflare-edge-locations
Approximation of cloudflare.com edge locations, usable via a lookup mechanism.

## Contents

If you're here for the plain data, have a look at

* [List of CloudFlare Edge Locations (as CSV)](#csv-list) 
* [List of CloudFlare Edge Locations (as JSON)](#json-lookup)

## Installation
To install, you can do the following:

```bash
$ npm i cloudflare-edge-locations
```

## Usage

### Node

```javascript
const CloudFlareEdgeLocations = require('cloudflare-edge-locations');
const el = new CloudFlareEdgeLocations();
const location = el.lookup('IAD');

/* returns
{
  "city": "Ashburn",
  "country": "United States",
  "countryCode": "US",
  "latitude": 38.94449997,
  "longitude": -77.45580292
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns 256

// Get all edge locations
const locations = el.getLocations();
```

### Browser

This package is published as an UMD module, and can be used in the browser directly from [unpkg](https://unpkg.com/).

```html
<html>
    <head>
        <script src="https://unpkg.com/cloudflare-edge-locations"></script> 
    </head>
    <body>
        <script>
            // Using the global variable
            document.write('There are ' + cloudFlareEdgeLocations.getLocationCount() + ' edge locations');
        </script>
    </body>
</html>
```

## Data generation

### TLDR

After installation of `jq` library, run `npm run generate`

### Explanation

To prepare the data regeneration, please run `npm run airports:download && npm run airports:filter && npm run countries:download`. This step requires an installation of [jq](https://github.com/stedolan/jq/wiki/Installation) on the machine where the commands are run.

The `generate.js` script will regenerate the `csv` and `json` versions of the CloudFlare Edge Location list in the `dist` folder.

It does this by extracting the information from the [CloudFlare Network Map page](https://www.cloudflare.com/network-map/), cleaning and unifiying it, and merging it with [airport data](https://datahub.io/core/airport-codes/r/airport-codes.json) (the first three characters of the `location` field are IATA airport codes) to also get the latitude/longitude information.

Also, there are some manual overrides when it wasn't possible to automatically determine the correct IATA code from the city names.

## Data

This project is considered as in the `alpha` stage, so there's **no guarantee that the data is accurate**. Please feel free to test and give feedback either via creating an [issue](https://github.com/tobilg/cloudflare-edge-locations/issues) or a [pr](https://github.com/tobilg/cloudflare-edge-locations/pulls)

### CSV list

The CSV version of the data can be found at [dist/cloudflare-edge-locations.csv](dist/cloudflare-edge-locations.csv). The file is using `,` as field separator.

### CSV list

The CSV version of the data can be found at [dist/cloudflare-edge-locations.csv](dist/cloudflare-edge-locations.csv). The file is using `,` as field separator.

```csv
code,city,country,country_code,latitude,longitude
IAD,Ashburn,United States,US,38.94449997,-77.45580292
ATL,Atlanta,United States,US,33.6367,-84.428101
BOS,Boston,United States,US,42.36429977,-71.00520325
BUF,Buffalo,United States,US,42.94049835,-78.73220062
YYC,Calgary,Canada,CA,51.113899231,-114.019996643
CLT,Charlotte,United States,US,35.2140007019043,-80.94309997558594
MDW,Chicago,United States,US,41.785999,-87.752403
CMH,Columbus,United States,US,39.998001,-82.891899
DAL,Dallas,United States,US,32.847099,-96.851799
DEN,Denver,United States,US,39.861698150635,-104.672996521
DTW,Detroit,United States,US,42.212398529052734,-83.35340118408203
HNL,Honolulu,United States,US,21.32062,-157.924228
HOU,Houston,United States,US,29.64539909,-95.27890015
IND,Indianapolis,United States,US,39.7173,-86.294403
JAX,Jacksonville,United States,US,30.49410057067871,-81.68789672851562
MCI,Kansas City,United States,US,39.2976,-94.713898
LAS,Las Vegas,United States,US,36.08010101,-115.1520004
LAX,Los Angeles,United States,US,33.942501,-118.407997
MFE,Mcallen,United States,US,26.175833,-98.238611
MEM,Memphis,United States,US,35.04240036010742,-89.97669982910156
MIA,Miami,United States,US,25.79319953918457,-80.29060363769531
MSP,Minneapolis,United States,US,44.882,-93.221802
MGM,Montgomery,United States,US,32.30059814,-86.39399719
YUL,Montréal,Canada,CA,45.4706001282,-73.7407989502
BNA,Nashville,United States,US,36.1245002746582,-86.6781997680664
EWR,Newark,United States,US,40.692501068115234,-74.168701171875
ORF,Norfolk,United States,US,36.89459991455078,-76.20120239257812
OMA,Omaha,United States,US,41.3032,-95.894096
YOW,Ottawa,Canada,CA,45.3224983215332,-75.66919708251953
PHL,Philadelphia,United States,US,39.87189865112305,-75.24109649658203
PHX,Phoenix,United States,US,33.43429946899414,-112.01200103759766
PIT,Pittsburgh,United States,US,40.49150085,-80.23290253
PDX,Portland,United States,US,45.58869934,-122.5979996
RIC,Richmond,United States,US,37.50519943237305,-77.3197021484375
SMF,Sacramento,United States,US,38.69540023803711,-121.59100341796875
SLC,Salt Lake City,United States,US,40.78839874267578,-111.97799682617188
SAN,San Diego,United States,US,32.7336006165,-117.190002441
SJC,San Jose,United States,US,37.362598,-121.929001
YXE,Saskatoon,Canada,CA,52.170799255371094,-106.69999694824219
BFI,Seattle,United States,US,47.529998779296875,-122.302001953125
STL,St. Louis,United States,US,38.747222,-90.361389
TLH,Tallahassee,United States,US,30.396499633789062,-84.35030364990234
TPA,Tampa,United States,US,27.975500106811523,-82.533203125
YYZ,Toronto,Canada,CA,43.6772003174,-79.63059997559999
YVR,Vancouver,Canada,CA,49.193901062,-123.183998108
YWG,Winnipeg,Canada,CA,49.909999847399995,-97.2398986816
VCP,Americana,Brazil,BR,-23.006944,-47.134444
ARI,Arica,Paraguay,PY,-18.348611,-70.338889
ASU,Asuncion,Chile,CL,-25.239722,-57.519167
CNF,Belo Horizonte,Brazil,BR,-19.62444305419922,-43.97194290161133
BEL,Belém,Brazil,BR,-1.3792500495900002,-48.4762992859
INV1,Blumenau,Brazil,BR,-26.923861,-49.066264
BOG,Bogota,Colombia,CO,4.70159,-74.1469
BSB,Brasília,Brazil,BR,-15.869167,-47.920834
EZE,Buenos Aires,Argentina,AR,-34.8222,-58.5358
VCP,Campinas,Brazil,BR,-23.0074005127,-47.1344985962
CFC,Caçador,Brazil,BR,-26.78840065,-50.9398002625
INV2,Cordoba,Argentina,AR,-31.3689,-64.2636
CWB,Curitiba,Brazil,BR,-25.5284996033,-49.1758003235
FLN,Florianópolis,Brazil,BR,-27.670278549194336,-48.5525016784668
FOR,Fortaleza,Brazil,BR,-3.775833,-38.532222
INV3,Goiânia,Brazil,BR,-16.704961,-49.240892
GUA,Guatemala City,Guatemala,GT,14.5833,-90.527496
GYE,Guayaquil,Ecuador,EC,-2.1574199199699997,-79.88359832760001
INV4,Itajaí,Brazil,BR,-26.983055,-48.816387
INV5,Joinville,Brazil,BR,-26.305918,-48.934853
JDO,Juazeiro do Norte,Brazil,BR,-7.21895980835,-39.270099639899996
LIM,Lima,Peru,PE,-12.0219,-77.114305
MAO,Manaus,Brazil,BR,-3.03861,-60.049702
MDE,Medellín,Colombia,CO,6.16454,-75.4231
MEX,Mexico City,Mexico,MX,19.4363,-99.072098
INV6,Neuquen,Argentina,AR,-38.413799,-68.737297
PAM,Panama City,United States,US,30.0695991516,-85.57540130619999
ORG,Paramaribo,Suriname,SR,5.81108,-55.190701
PAP,Port-Au-Prince,Haiti,HT,18.579999923706055,-72.2925033569336
INV7,Porto Alegre,Brazil,BR,-29.945928,-51.144413
QRO,Queretaro,Mexico,MX,20.6173,-100.185997
UIO,Quito,Ecuador,EC,-0.129166666667,-78.3575
INV8,Ribeirão Preto,Brazil,BR,-21.22671,-47.782154
GIG,Rio de Janeiro,Brazil,BR,-22.8099994659,-43.2505569458
SSA,Salvador,Brazil,BR,-12.9086112976,-38.3224983215
INV9,San José,Costa Rica,CR,9.933333396911621,-84.16666412353516
INV10,Sorocaba,Brazil,BR,-23.536126,-47.464542
GND,St. George's,Grenada,GD,12.004247,-61.786192
SJP,São José do Rio Preto,Brazil,BR,-20.816600799599996,-49.40650177
GRU,São Paulo,Brazil,BR,-23.435556411743164,-46.47305679321289
TGU,Tegucigalpa,Honduras,HN,14.06089973449707,-87.21720123291016
UDI,Uberlândia,Brazil,BR,-18.883612,-48.225277
INV11,Valparaíso,Brazil,BR,-21.329036,-50.950942
CUR,Willemstad,Curaçao,CW,12.1889,-68.959801
ACC,Accra,Ghana,GH,5.605189800262451,-0.16678600013256073
ALG,Algiers,Algeria,DZ,36.691001892089844,3.215409994125366
TNR,Antananarivo,Madagascar,MG,-18.7969,47.478802
CPT,Cape Town,South Africa,ZA,-33.9648017883,18.6016998291
CMN,Casablanca,Morocco,MA,33.36750030517578,-7.589970111846924
DSS,Dakar,Senegal,SN,14.67,-17.073333
DAR,Dar Es Salaam,Tanzania, United Republic of,TZ,-6.87811,39.202599
JIB,Djibouti,Djibouti,DJ,11.546258,43.159206
DUR,Durban,South Africa,ZA,-29.6144444444,31.1197222222
HRE,Harare,Zimbabwe,ZW,-17.931801,31.0928
JNB,Johannesburg,South Africa,ZA,-26.1392,28.246
KGL,Kigali,Rwanda,RW,-1.96863,30.1395
LOS,Lagos,Nigeria,NG,6.5773701667785645,3.321160078048706
LAD,Luanda,Angola,AO,-8.85837,13.2312
MPM,Maputo,Mozambique,MZ,-25.920799,32.572601
MBA,Mombasa,Kenya,KE,-4.034830093383789,39.594200134277344
ROB,Monrovia,Liberia,LR,6.23379,-10.3623
NBO,Nairobi,Kenya,KE,-1.31923997402,36.9277992249
MRU,Port Louis,Mauritius,MU,-20.430201,57.683601
RUN,Reunion,France,FR,20.89,55.516389
TUN,Tunis,Tunisia,TN,36.85100173950195,10.22719955444336
AMS,Amsterdam,Netherlands,NL,52.308601,4.76389
ATH,Athens,Greece,GR,37.9364013672,23.9444999695
BCN,Barcelona,Spain,ES,41.2971,2.07846
BEG,Belgrade,Serbia,RS,44.8184013367,20.3090991974
SXF,Berlin,Germany,DE,52.380001,13.5225
BRU,Brussels,Belgium,BE,50.901401519800004,4.48443984985
OTP,Bucharest,Romania,RO,44.5711111,26.085
BUD,Budapest,Hungary,HU,47.42976,19.261093
KIV,Chisinau,Moldova, Republic of,MD,46.927778,28.930833
CPH,Copenhagen,Denmark,DK,55.617900848389,12.656000137329
ORK,Cork,Ireland,IE,51.84130096435547,-8.491109848022461
DUB,Dublin,Ireland,IE,53.421299,-6.27007
DUS,Düsseldorf,Germany,DE,51.289501,6.76678
EDI,Edinburgh,United Kingdom,GB,55.95000076293945,-3.372499942779541
SVX,Yekaterinburg,Russian Federation,RU,56.743099212646,60.802700042725
FRA,Frankfurt am Main,Germany,DE,50.033333,8.570556
GVA,Geneva,Switzerland,CH,46.23809814453125,6.108950138092041
GOT,Gothenburg,Sweden,SE,57.662799835205,12.279800415039
HAM,Hamburg,Germany,DE,53.630401611328,9.9882297515869
HEL,Helsinki,Finland,FI,60.317199707031,24.963300704956
ISL,Istanbul,Turkey,TR,40.976898,28.8146
KHV,Khabarovsk,Russian Federation,RU,48.52799987793,135.18800354004
KJA,Krasnoyarsk,Russian Federation,RU,56.172901,92.493301
IEV,Kyiv,Ukraine,UA,50.401667,30.451667
LIS,Lisbon,Portugal,PT,38.7813,-9.13592
LTN,London,United Kingdom,GB,51.874698638916016,-0.36833301186561584
LUX,Luxembourg,Luxembourg,LU,49.6233333,6.2044444
MAD,Madrid,Spain,ES,40.471926,-3.56264
MAN,Manchester,United Kingdom,GB,53.35369873046875,-2.2749500274658203
MRS,Marseille,France,FR,43.439271922,5.22142410278
MXP,Milan,Italy,IT,45.6306,8.72811
MSQ,Minsk,Belarus,BY,53.882499694824,28.030700683594
ZIA,Moscow,Russian Federation,RU,55.553299,38.150002
MUC,Munich,Germany,DE,48.353802,11.7861
NIC,Nicosia,Cyprus,CY,35.1507987976,33.2787017822
OSL,Oslo,Norway,NO,60.193901062012,11.100399971008
PMO,Palermo,Italy,IT,38.175999,13.091
CDG,Paris,France,FR,49.012798,2.55
PRG,Prague,Czech Republic,CZ,50.1008,14.26
KEF,Reykjavík,Iceland,IS,63.985001,-22.6056
RIX,Riga,Latvia,LV,56.92359924316406,23.971099853515625
CIA,Rome,Italy,IT,41.7994,12.5949
SOF,Sofia,Bulgaria,BG,42.696693420410156,23.411436080932617
LED,St. Petersburg,Russian Federation,RU,59.80030059814453,30.262500762939453
ARN,Stockholm,Sweden,SE,59.651901245117,17.918600082397
TLL,Tallinn,Estonia,EE,59.41329956049999,24.832799911499997
SKG,Thessaloniki,Greece,GR,40.51969909667969,22.97089958190918
VIE,Vienna,Austria,AT,48.110298156738,16.569700241089
VNO,Vilnius,Lithuania,LT,54.634102,25.285801
WMI,Warsaw,Poland,PL,52.451099,20.6518
ZAG,Zagreb,Croatia,HR,45.7429008484,16.0687999725
ZRH,Zurich,Switzerland,CH,47.464699,8.54917
AMM,Amman,Jordan,JO,31.7226009369,35.9931983948
BGW,Baghdad,Iraq,IQ,33.262500762900004,44.2346000671
BEY,Beirut,Lebanon,LB,33.820899963378906,35.488399505615234
DMM,Dammam,Saudi Arabia,SA,26.471194,49.798583
DOH,Doha,Qatar,QA,25.273056,51.608056
DXB,Dubai,United Arab Emirates,AE,25.2527999878,55.3643989563
INV12,Erbil,undefined,IQ,undefined,undefined
HFA,Haifa,Israel,IL,32.80939865112305,35.04309844970703
JED,Jeddah,Saudi Arabia,SA,21.6796,39.156502
KWI,Kuwait City,Kuwait,KW,29.226600646972656,47.96889877319336
BAH,Manama,Bahrain,BH,26.27079963684082,50.63359832763672
MCT,Muscat,Oman,OM,23.593299865722656,58.284400939941406
JRS,Ramallah,Israel,IL,31.864722,35.219167
RUH,Riyadh,Saudi Arabia,SA,24.957599639892578,46.69879913330078
TLV,Tel Aviv,Israel,IL,32.01139831542969,34.88669967651367
AMD,Ahmedabad,India,IN,23.0771999359,72.63469696039999
ALA,Almaty,Kazakhstan,KZ,43.35210037231445,77.04049682617188
GYD,Baku,Azerbaijan,AZ,40.467498779296875,50.04669952392578
BWN,Bandar Seri Begawan,Brunei Darussalam,BN,4.944200038909912,114.9280014038086
DMK,Bangkok,Thailand,TH,13.9125995636,100.607002258
INV13,Bengaluru,India,IN,13.07674,77.597645
INV14,Bhubaneshwar,undefined,IN,undefined,undefined
LLC,Cagayan,Philippines,PH,18.181111,121.745
CEB,Cebu,Philippines,PH,10.307222,123.978889
IXC,Chandigarh,India,IN,30.673500061035156,76.78849792480469
MAA,Chennai,India,IN,12.990005493164062,80.16929626464844
CNX,Chiang Mai,Thailand,TH,18.766799926799997,98.962600708
CGP,Chittagong,Bangladesh,BD,22.24959945678711,91.81330108642578
CMB,Colombo,Sri Lanka,LK,7.180759906768799,79.88410186767578
DAC,Dhaka,Bangladesh,BD,23.843347,90.397783
FUK,Fukuoka,Japan,JP,33.585899353027344,130.4510040283203
HAN,Hanoi,Viet Nam,VN,21.221200942993164,105.80699920654297
SGN,Ho Chi Minh City,Viet Nam,VN,10.8187999725,106.652000427
HKG,Hong Kong,Hong Kong,HK,22.308901,113.915001
HYD,Hyderabad,India,IN,17.231318,78.429855
ISB,Islamabad,Pakistan,PK,33.549,72.82566
CGK,Jakarta,Indonesia,ID,-6.1255698204,106.65599823
JSR,Jashore,Bangladesh,BD,23.183611,89.160833
JHB,Johor Bahru,Malaysia,MY,1.64131,103.669998
KNU,Kanpur,India,IN,26.404301,80.410103
KHI,Karachi,Pakistan,PK,24.9065,67.160797
KTM,Kathmandu,Nepal,NP,27.6966,85.3591
CCU,Kolkata,India,IN,22.654699325561523,88.44670104980469
KUL,Kuala Lumpur,Malaysia,MY,2.745579957962,101.70999908447
LHE,Lahore,Pakistan,PK,31.5216007232666,74.40360260009766
MFM,Macau,Macao,MO,22.149599,113.592003
MLE,Male,Maldives,MV,4.191667,73.528889
MDL,Mandalay,Myanmar,MM,21.702199935913086,95.97789764404297
MNL,Manila,Philippines,PH,14.5086,121.019997
BOM,Mumbai,India,IN,19.0886993408,72.8678970337
NAG,Nagpur,India,IN,21.092199,79.047203
OKA,Naha,Japan,JP,26.1958007812,127.646003723
DEL,New Delhi,India,IN,28.5665,77.103104
KIX,Osaka,Japan,JP,34.42729949951172,135.24400329589844
PAT,Patna,India,IN,25.591299057,85.0879974365
PNH,Phnom Penh,Cambodia,KH,11.546600341796875,104.84400177001953
ICN,Seoul,Korea, Republic of,KR,37.46910095214844,126.45099639892578
SIN,Singapore,Singapore,SG,1.35019,103.994003
URT,Surat Thani,Thailand,TH,9.13259983063,99.135597229
TPE,Taipei,Taiwan, Province of China,TW,25.0777,121.233002
TAS,Tashkent,Uzbekistan,UZ,41.257900238,69.2811965942
TBS,Tbilisi,Georgia,GE,41.6692008972,44.95470047
INV15,Thimphu,Bhutan,BT,27.4513,89.6557
NRT,Tokyo,Japan,JP,35.764702,140.386002
UBN,Ulaanbaatar,Mongolia,MN,47.646916,106.819833
VTE,Vientiane,Lao People's Democratic Republic,LA,17.988300323500003,102.56300354
RGN,Yangon,Myanmar,MM,16.907300949099998,96.1332015991
EVN,Yerevan,Armenia,AM,40.1473007202,44.3959007263
YIA,Yogyakarta,Indonesia,ID,-7.905338,110.057264
AQG,Anquing,China,CN,30.582222,117.050278
IQN,Baoji,China,CN,35.7997222222,107.6027777778
PEK,Beijing,China,CN,40.080101013183594,116.58499908447266
CGD,Changde,China,CN,28.9188995361,111.63999939
CZX,Changzhou,China,CN,31.919701,119.778999
CTU,Chengdu,China,CN,30.578500747680664,103.9469985961914
HAK,Chengmai,China,CN,19.934722,110.458889
DLC,Dalian,China,CN,38.9656982421875,121.53900146484375
FUO,Foshan,China,CN,23.083299636799996,113.069999695
FOC,Fuzhou,China,CN,25.935100555419922,119.66300201416016
CAN,Guangzhou,China,CN,23.39240074157715,113.29900360107422
KWE,Guiyang,China,CN,26.53849983215332,106.8010025024414
HAK,Haikou,China,CN,19.934900283813477,110.45899963378906
HET,Hohhot,China,CN,40.851398,111.823997
HFE,Huainan,China,CN,31.7800006866455,117.297996520996
TNA,Jinan,China,CN,36.857200622558594,117.21600341796875
YIW,Jinhua,China,CN,29.344722,120.032222
NAY,Langfang,China,CN,39.7827987670898,116.388000488281
INV16,Lanzhou,China,CN,35.91780090332031,104.21800231933594
ZHA,Maoming,China,CN,21.266666666667,110.46666666667
KHN,Nanchang,China,CN,28.864999771118164,115.9000015258789
TAO,Qingdao,China,CN,36.2661018372,120.374000549
BPE,Qinhuangdao,China,CN,39.666389,119.058889
JJN,Quanzhou,China,CN,24.7964,118.589996
JUZ,Quzhou,China,CN,28.965799,118.899002
PVG,Shanghai,China,CN,31.143400192260742,121.80500030517578
SHE,Shenyang,China,CN,41.639801025390625,123.48300170898438
WDS,Shiyan,China,CN,32.591667,110.907778
XUZ,Suqian,China,CN,34.059056,117.555278
HYN,Taizhou,China,CN,28.562222,121.428611
WUX,Wuxi,China,CN,31.494400024399997,120.429000854
XIY,Xianyang,China,CN,34.437806,108.756556
XNN,Xining,China,CN,36.5275,102.042999
YIC,Xinyu,China,CN,27.8025,114.3062
INV17,Yichang,China,CN,30.671,111.4404
CGD,Yiyang,China,CN,28.9188995361,111.63999939
CGO,Zhengzhou,China,CN,34.519699096699995,113.841003418
ADL,Adelaide,Australia,AU,-34.945,138.531006
AKL,Auckland,New Zealand,NZ,-37.008098602299995,174.792007446
BNE,Brisbane,Australia,AU,-27.384199142456055,153.11700439453125
CBR,Canberra,Australia,AU,-35.30690002441406,149.19500732421875
INV18,Guam,Guam,GU,13.475863,144.812142
MEL,Melbourne,Australia,AU,-37.673302,144.843002
NOU,Noumea,New Caledonia,NC,-22.016389,166.216111
PER,Perth,Australia,AU,-31.94029998779297,115.96700286865234
SYD,Sydney,Australia,AU,-33.94609832763672,151.177001953125
```

### JSON lookup

The JSON version of the data can be found at [dist/cloudflare-edge-locations.json](dist/cloudflare-edge-locations.json).

```javascript
{
  "IAD": {
    "city": "Ashburn",
    "country": "United States",
    "countryCode": "US",
    "latitude": 38.94449997,
    "longitude": -77.45580292
  },
  "ATL": {
    "city": "Atlanta",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.6367,
    "longitude": -84.428101
  },
  "BOS": {
    "city": "Boston",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.36429977,
    "longitude": -71.00520325
  },
  "BUF": {
    "city": "Buffalo",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.94049835,
    "longitude": -78.73220062
  },
  "YYC": {
    "city": "Calgary",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 51.113899231,
    "longitude": -114.019996643
  },
  "CLT": {
    "city": "Charlotte",
    "country": "United States",
    "countryCode": "US",
    "latitude": 35.2140007019043,
    "longitude": -80.94309997558594
  },
  "MDW": {
    "city": "Chicago",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.785999,
    "longitude": -87.752403
  },
  "CMH": {
    "city": "Columbus",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.998001,
    "longitude": -82.891899
  },
  "DAL": {
    "city": "Dallas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.847099,
    "longitude": -96.851799
  },
  "DEN": {
    "city": "Denver",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.861698150635,
    "longitude": -104.672996521
  },
  "DTW": {
    "city": "Detroit",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.212398529052734,
    "longitude": -83.35340118408203
  },
  "HNL": {
    "city": "Honolulu",
    "country": "United States",
    "countryCode": "US",
    "latitude": 21.32062,
    "longitude": -157.924228
  },
  "HOU": {
    "city": "Houston",
    "country": "United States",
    "countryCode": "US",
    "latitude": 29.64539909,
    "longitude": -95.27890015
  },
  "IND": {
    "city": "Indianapolis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.7173,
    "longitude": -86.294403
  },
  "JAX": {
    "city": "Jacksonville",
    "country": "United States",
    "countryCode": "US",
    "latitude": 30.49410057067871,
    "longitude": -81.68789672851562
  },
  "MCI": {
    "city": "Kansas City",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.2976,
    "longitude": -94.713898
  },
  "LAS": {
    "city": "Las Vegas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.08010101,
    "longitude": -115.1520004
  },
  "LAX": {
    "city": "Los Angeles",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.942501,
    "longitude": -118.407997
  },
  "MFE": {
    "city": "Mcallen",
    "country": "United States",
    "countryCode": "US",
    "latitude": 26.175833,
    "longitude": -98.238611
  },
  "MEM": {
    "city": "Memphis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 35.04240036010742,
    "longitude": -89.97669982910156
  },
  "MIA": {
    "city": "Miami",
    "country": "United States",
    "countryCode": "US",
    "latitude": 25.79319953918457,
    "longitude": -80.29060363769531
  },
  "MSP": {
    "city": "Minneapolis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 44.882,
    "longitude": -93.221802
  },
  "MGM": {
    "city": "Montgomery",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.30059814,
    "longitude": -86.39399719
  },
  "YUL": {
    "city": "Montréal",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 45.4706001282,
    "longitude": -73.7407989502
  },
  "BNA": {
    "city": "Nashville",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.1245002746582,
    "longitude": -86.6781997680664
  },
  "EWR": {
    "city": "Newark",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.692501068115234,
    "longitude": -74.168701171875
  },
  "ORF": {
    "city": "Norfolk",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.89459991455078,
    "longitude": -76.20120239257812
  },
  "OMA": {
    "city": "Omaha",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.3032,
    "longitude": -95.894096
  },
  "YOW": {
    "city": "Ottawa",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 45.3224983215332,
    "longitude": -75.66919708251953
  },
  "PHL": {
    "city": "Philadelphia",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.87189865112305,
    "longitude": -75.24109649658203
  },
  "PHX": {
    "city": "Phoenix",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.43429946899414,
    "longitude": -112.01200103759766
  },
  "PIT": {
    "city": "Pittsburgh",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.49150085,
    "longitude": -80.23290253
  },
  "PDX": {
    "city": "Portland",
    "country": "United States",
    "countryCode": "US",
    "latitude": 45.58869934,
    "longitude": -122.5979996
  },
  "RIC": {
    "city": "Richmond",
    "country": "United States",
    "countryCode": "US",
    "latitude": 37.50519943237305,
    "longitude": -77.3197021484375
  },
  "SMF": {
    "city": "Sacramento",
    "country": "United States",
    "countryCode": "US",
    "latitude": 38.69540023803711,
    "longitude": -121.59100341796875
  },
  "SLC": {
    "city": "Salt Lake City",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.78839874267578,
    "longitude": -111.97799682617188
  },
  "SAN": {
    "city": "San Diego",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.7336006165,
    "longitude": -117.190002441
  },
  "SJC": {
    "city": "San Jose",
    "country": "United States",
    "countryCode": "US",
    "latitude": 37.362598,
    "longitude": -121.929001
  },
  "YXE": {
    "city": "Saskatoon",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 52.170799255371094,
    "longitude": -106.69999694824219
  },
  "BFI": {
    "city": "Seattle",
    "country": "United States",
    "countryCode": "US",
    "latitude": 47.529998779296875,
    "longitude": -122.302001953125
  },
  "STL": {
    "city": "St. Louis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 38.747222,
    "longitude": -90.361389
  },
  "TLH": {
    "city": "Tallahassee",
    "country": "United States",
    "countryCode": "US",
    "latitude": 30.396499633789062,
    "longitude": -84.35030364990234
  },
  "TPA": {
    "city": "Tampa",
    "country": "United States",
    "countryCode": "US",
    "latitude": 27.975500106811523,
    "longitude": -82.533203125
  },
  "YYZ": {
    "city": "Toronto",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 43.6772003174,
    "longitude": -79.63059997559999
  },
  "YVR": {
    "city": "Vancouver",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 49.193901062,
    "longitude": -123.183998108
  },
  "YWG": {
    "city": "Winnipeg",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 49.909999847399995,
    "longitude": -97.2398986816
  },
  "VCP": {
    "city": "Campinas",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.0074005127,
    "longitude": -47.1344985962
  },
  "ARI": {
    "city": "Arica",
    "country": "Paraguay",
    "countryCode": "PY",
    "latitude": -18.348611,
    "longitude": -70.338889
  },
  "ASU": {
    "city": "Asuncion",
    "country": "Chile",
    "countryCode": "CL",
    "latitude": -25.239722,
    "longitude": -57.519167
  },
  "CNF": {
    "city": "Belo Horizonte",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -19.62444305419922,
    "longitude": -43.97194290161133
  },
  "BEL": {
    "city": "Belém",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -1.3792500495900002,
    "longitude": -48.4762992859
  },
  "INV1": {
    "city": "Blumenau",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -26.923861,
    "longitude": -49.066264
  },
  "BOG": {
    "city": "Bogota",
    "country": "Colombia",
    "countryCode": "CO",
    "latitude": 4.70159,
    "longitude": -74.1469
  },
  "BSB": {
    "city": "Brasília",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -15.869167,
    "longitude": -47.920834
  },
  "EZE": {
    "city": "Buenos Aires",
    "country": "Argentina",
    "countryCode": "AR",
    "latitude": -34.8222,
    "longitude": -58.5358
  },
  "CFC": {
    "city": "Caçador",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -26.78840065,
    "longitude": -50.9398002625
  },
  "INV2": {
    "city": "Cordoba",
    "country": "Argentina",
    "countryCode": "AR",
    "latitude": -31.3689,
    "longitude": -64.2636
  },
  "CWB": {
    "city": "Curitiba",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -25.5284996033,
    "longitude": -49.1758003235
  },
  "FLN": {
    "city": "Florianópolis",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -27.670278549194336,
    "longitude": -48.5525016784668
  },
  "FOR": {
    "city": "Fortaleza",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -3.775833,
    "longitude": -38.532222
  },
  "INV3": {
    "city": "Goiânia",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -16.704961,
    "longitude": -49.240892
  },
  "GUA": {
    "city": "Guatemala City",
    "country": "Guatemala",
    "countryCode": "GT",
    "latitude": 14.5833,
    "longitude": -90.527496
  },
  "GYE": {
    "city": "Guayaquil",
    "country": "Ecuador",
    "countryCode": "EC",
    "latitude": -2.1574199199699997,
    "longitude": -79.88359832760001
  },
  "INV4": {
    "city": "Itajaí",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -26.983055,
    "longitude": -48.816387
  },
  "INV5": {
    "city": "Joinville",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -26.305918,
    "longitude": -48.934853
  },
  "JDO": {
    "city": "Juazeiro do Norte",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -7.21895980835,
    "longitude": -39.270099639899996
  },
  "LIM": {
    "city": "Lima",
    "country": "Peru",
    "countryCode": "PE",
    "latitude": -12.0219,
    "longitude": -77.114305
  },
  "MAO": {
    "city": "Manaus",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -3.03861,
    "longitude": -60.049702
  },
  "MDE": {
    "city": "Medellín",
    "country": "Colombia",
    "countryCode": "CO",
    "latitude": 6.16454,
    "longitude": -75.4231
  },
  "MEX": {
    "city": "Mexico City",
    "country": "Mexico",
    "countryCode": "MX",
    "latitude": 19.4363,
    "longitude": -99.072098
  },
  "INV6": {
    "city": "Neuquen",
    "country": "Argentina",
    "countryCode": "AR",
    "latitude": -38.413799,
    "longitude": -68.737297
  },
  "PAM": {
    "city": "Panama City",
    "country": "United States",
    "countryCode": "US",
    "latitude": 30.0695991516,
    "longitude": -85.57540130619999
  },
  "ORG": {
    "city": "Paramaribo",
    "country": "Suriname",
    "countryCode": "SR",
    "latitude": 5.81108,
    "longitude": -55.190701
  },
  "PAP": {
    "city": "Port-Au-Prince",
    "country": "Haiti",
    "countryCode": "HT",
    "latitude": 18.579999923706055,
    "longitude": -72.2925033569336
  },
  "INV7": {
    "city": "Porto Alegre",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -29.945928,
    "longitude": -51.144413
  },
  "QRO": {
    "city": "Queretaro",
    "country": "Mexico",
    "countryCode": "MX",
    "latitude": 20.6173,
    "longitude": -100.185997
  },
  "UIO": {
    "city": "Quito",
    "country": "Ecuador",
    "countryCode": "EC",
    "latitude": -0.129166666667,
    "longitude": -78.3575
  },
  "INV8": {
    "city": "Ribeirão Preto",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -21.22671,
    "longitude": -47.782154
  },
  "GIG": {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -22.8099994659,
    "longitude": -43.2505569458
  },
  "SSA": {
    "city": "Salvador",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -12.9086112976,
    "longitude": -38.3224983215
  },
  "INV9": {
    "city": "San José",
    "country": "Costa Rica",
    "countryCode": "CR",
    "latitude": 9.933333396911621,
    "longitude": -84.16666412353516
  },
  "INV10": {
    "city": "Sorocaba",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.536126,
    "longitude": -47.464542
  },
  "GND": {
    "city": "St. George's",
    "country": "Grenada",
    "countryCode": "GD",
    "latitude": 12.004247,
    "longitude": -61.786192
  },
  "SJP": {
    "city": "São José do Rio Preto",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -20.816600799599996,
    "longitude": -49.40650177
  },
  "GRU": {
    "city": "São Paulo",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.435556411743164,
    "longitude": -46.47305679321289
  },
  "TGU": {
    "city": "Tegucigalpa",
    "country": "Honduras",
    "countryCode": "HN",
    "latitude": 14.06089973449707,
    "longitude": -87.21720123291016
  },
  "UDI": {
    "city": "Uberlândia",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -18.883612,
    "longitude": -48.225277
  },
  "INV11": {
    "city": "Valparaíso",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -21.329036,
    "longitude": -50.950942
  },
  "CUR": {
    "city": "Willemstad",
    "country": "Curaçao",
    "countryCode": "CW",
    "latitude": 12.1889,
    "longitude": -68.959801
  },
  "ACC": {
    "city": "Accra",
    "country": "Ghana",
    "countryCode": "GH",
    "latitude": 5.605189800262451,
    "longitude": -0.16678600013256073
  },
  "ALG": {
    "city": "Algiers",
    "country": "Algeria",
    "countryCode": "DZ",
    "latitude": 36.691001892089844,
    "longitude": 3.215409994125366
  },
  "TNR": {
    "city": "Antananarivo",
    "country": "Madagascar",
    "countryCode": "MG",
    "latitude": -18.7969,
    "longitude": 47.478802
  },
  "CPT": {
    "city": "Cape Town",
    "country": "South Africa",
    "countryCode": "ZA",
    "latitude": -33.9648017883,
    "longitude": 18.6016998291
  },
  "CMN": {
    "city": "Casablanca",
    "country": "Morocco",
    "countryCode": "MA",
    "latitude": 33.36750030517578,
    "longitude": -7.589970111846924
  },
  "DSS": {
    "city": "Dakar",
    "country": "Senegal",
    "countryCode": "SN",
    "latitude": 14.67,
    "longitude": -17.073333
  },
  "DAR": {
    "city": "Dar Es Salaam",
    "country": "Tanzania, United Republic of",
    "countryCode": "TZ",
    "latitude": -6.87811,
    "longitude": 39.202599
  },
  "JIB": {
    "city": "Djibouti",
    "country": "Djibouti",
    "countryCode": "DJ",
    "latitude": 11.546258,
    "longitude": 43.159206
  },
  "DUR": {
    "city": "Durban",
    "country": "South Africa",
    "countryCode": "ZA",
    "latitude": -29.6144444444,
    "longitude": 31.1197222222
  },
  "HRE": {
    "city": "Harare",
    "country": "Zimbabwe",
    "countryCode": "ZW",
    "latitude": -17.931801,
    "longitude": 31.0928
  },
  "JNB": {
    "city": "Johannesburg",
    "country": "South Africa",
    "countryCode": "ZA",
    "latitude": -26.1392,
    "longitude": 28.246
  },
  "KGL": {
    "city": "Kigali",
    "country": "Rwanda",
    "countryCode": "RW",
    "latitude": -1.96863,
    "longitude": 30.1395
  },
  "LOS": {
    "city": "Lagos",
    "country": "Nigeria",
    "countryCode": "NG",
    "latitude": 6.5773701667785645,
    "longitude": 3.321160078048706
  },
  "LAD": {
    "city": "Luanda",
    "country": "Angola",
    "countryCode": "AO",
    "latitude": -8.85837,
    "longitude": 13.2312
  },
  "MPM": {
    "city": "Maputo",
    "country": "Mozambique",
    "countryCode": "MZ",
    "latitude": -25.920799,
    "longitude": 32.572601
  },
  "MBA": {
    "city": "Mombasa",
    "country": "Kenya",
    "countryCode": "KE",
    "latitude": -4.034830093383789,
    "longitude": 39.594200134277344
  },
  "ROB": {
    "city": "Monrovia",
    "country": "Liberia",
    "countryCode": "LR",
    "latitude": 6.23379,
    "longitude": -10.3623
  },
  "NBO": {
    "city": "Nairobi",
    "country": "Kenya",
    "countryCode": "KE",
    "latitude": -1.31923997402,
    "longitude": 36.9277992249
  },
  "MRU": {
    "city": "Port Louis",
    "country": "Mauritius",
    "countryCode": "MU",
    "latitude": -20.430201,
    "longitude": 57.683601
  },
  "RUN": {
    "city": "Reunion",
    "country": "France",
    "countryCode": "FR",
    "latitude": 20.89,
    "longitude": 55.516389
  },
  "TUN": {
    "city": "Tunis",
    "country": "Tunisia",
    "countryCode": "TN",
    "latitude": 36.85100173950195,
    "longitude": 10.22719955444336
  },
  "AMS": {
    "city": "Amsterdam",
    "country": "Netherlands",
    "countryCode": "NL",
    "latitude": 52.308601,
    "longitude": 4.76389
  },
  "ATH": {
    "city": "Athens",
    "country": "Greece",
    "countryCode": "GR",
    "latitude": 37.9364013672,
    "longitude": 23.9444999695
  },
  "BCN": {
    "city": "Barcelona",
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 41.2971,
    "longitude": 2.07846
  },
  "BEG": {
    "city": "Belgrade",
    "country": "Serbia",
    "countryCode": "RS",
    "latitude": 44.8184013367,
    "longitude": 20.3090991974
  },
  "SXF": {
    "city": "Berlin",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 52.380001,
    "longitude": 13.5225
  },
  "BRU": {
    "city": "Brussels",
    "country": "Belgium",
    "countryCode": "BE",
    "latitude": 50.901401519800004,
    "longitude": 4.48443984985
  },
  "OTP": {
    "city": "Bucharest",
    "country": "Romania",
    "countryCode": "RO",
    "latitude": 44.5711111,
    "longitude": 26.085
  },
  "BUD": {
    "city": "Budapest",
    "country": "Hungary",
    "countryCode": "HU",
    "latitude": 47.42976,
    "longitude": 19.261093
  },
  "KIV": {
    "city": "Chisinau",
    "country": "Moldova, Republic of",
    "countryCode": "MD",
    "latitude": 46.927778,
    "longitude": 28.930833
  },
  "CPH": {
    "city": "Copenhagen",
    "country": "Denmark",
    "countryCode": "DK",
    "latitude": 55.617900848389,
    "longitude": 12.656000137329
  },
  "ORK": {
    "city": "Cork",
    "country": "Ireland",
    "countryCode": "IE",
    "latitude": 51.84130096435547,
    "longitude": -8.491109848022461
  },
  "DUB": {
    "city": "Dublin",
    "country": "Ireland",
    "countryCode": "IE",
    "latitude": 53.421299,
    "longitude": -6.27007
  },
  "DUS": {
    "city": "Düsseldorf",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 51.289501,
    "longitude": 6.76678
  },
  "EDI": {
    "city": "Edinburgh",
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 55.95000076293945,
    "longitude": -3.372499942779541
  },
  "SVX": {
    "city": "Yekaterinburg",
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 56.743099212646,
    "longitude": 60.802700042725
  },
  "FRA": {
    "city": "Frankfurt am Main",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 50.033333,
    "longitude": 8.570556
  },
  "GVA": {
    "city": "Geneva",
    "country": "Switzerland",
    "countryCode": "CH",
    "latitude": 46.23809814453125,
    "longitude": 6.108950138092041
  },
  "GOT": {
    "city": "Gothenburg",
    "country": "Sweden",
    "countryCode": "SE",
    "latitude": 57.662799835205,
    "longitude": 12.279800415039
  },
  "HAM": {
    "city": "Hamburg",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 53.630401611328,
    "longitude": 9.9882297515869
  },
  "HEL": {
    "city": "Helsinki",
    "country": "Finland",
    "countryCode": "FI",
    "latitude": 60.317199707031,
    "longitude": 24.963300704956
  },
  "ISL": {
    "city": "Istanbul",
    "country": "Turkey",
    "countryCode": "TR",
    "latitude": 40.976898,
    "longitude": 28.8146
  },
  "KHV": {
    "city": "Khabarovsk",
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 48.52799987793,
    "longitude": 135.18800354004
  },
  "KJA": {
    "city": "Krasnoyarsk",
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 56.172901,
    "longitude": 92.493301
  },
  "IEV": {
    "city": "Kyiv",
    "country": "Ukraine",
    "countryCode": "UA",
    "latitude": 50.401667,
    "longitude": 30.451667
  },
  "LIS": {
    "city": "Lisbon",
    "country": "Portugal",
    "countryCode": "PT",
    "latitude": 38.7813,
    "longitude": -9.13592
  },
  "LTN": {
    "city": "London",
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 51.874698638916016,
    "longitude": -0.36833301186561584
  },
  "LUX": {
    "city": "Luxembourg",
    "country": "Luxembourg",
    "countryCode": "LU",
    "latitude": 49.6233333,
    "longitude": 6.2044444
  },
  "MAD": {
    "city": "Madrid",
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 40.471926,
    "longitude": -3.56264
  },
  "MAN": {
    "city": "Manchester",
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 53.35369873046875,
    "longitude": -2.2749500274658203
  },
  "MRS": {
    "city": "Marseille",
    "country": "France",
    "countryCode": "FR",
    "latitude": 43.439271922,
    "longitude": 5.22142410278
  },
  "MXP": {
    "city": "Milan",
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 45.6306,
    "longitude": 8.72811
  },
  "MSQ": {
    "city": "Minsk",
    "country": "Belarus",
    "countryCode": "BY",
    "latitude": 53.882499694824,
    "longitude": 28.030700683594
  },
  "ZIA": {
    "city": "Moscow",
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 55.553299,
    "longitude": 38.150002
  },
  "MUC": {
    "city": "Munich",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 48.353802,
    "longitude": 11.7861
  },
  "NIC": {
    "city": "Nicosia",
    "country": "Cyprus",
    "countryCode": "CY",
    "latitude": 35.1507987976,
    "longitude": 33.2787017822
  },
  "OSL": {
    "city": "Oslo",
    "country": "Norway",
    "countryCode": "NO",
    "latitude": 60.193901062012,
    "longitude": 11.100399971008
  },
  "PMO": {
    "city": "Palermo",
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 38.175999,
    "longitude": 13.091
  },
  "CDG": {
    "city": "Paris",
    "country": "France",
    "countryCode": "FR",
    "latitude": 49.012798,
    "longitude": 2.55
  },
  "PRG": {
    "city": "Prague",
    "country": "Czech Republic",
    "countryCode": "CZ",
    "latitude": 50.1008,
    "longitude": 14.26
  },
  "KEF": {
    "city": "Reykjavík",
    "country": "Iceland",
    "countryCode": "IS",
    "latitude": 63.985001,
    "longitude": -22.6056
  },
  "RIX": {
    "city": "Riga",
    "country": "Latvia",
    "countryCode": "LV",
    "latitude": 56.92359924316406,
    "longitude": 23.971099853515625
  },
  "CIA": {
    "city": "Rome",
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 41.7994,
    "longitude": 12.5949
  },
  "SOF": {
    "city": "Sofia",
    "country": "Bulgaria",
    "countryCode": "BG",
    "latitude": 42.696693420410156,
    "longitude": 23.411436080932617
  },
  "LED": {
    "city": "St. Petersburg",
    "country": "Russian Federation",
    "countryCode": "RU",
    "latitude": 59.80030059814453,
    "longitude": 30.262500762939453
  },
  "ARN": {
    "city": "Stockholm",
    "country": "Sweden",
    "countryCode": "SE",
    "latitude": 59.651901245117,
    "longitude": 17.918600082397
  },
  "TLL": {
    "city": "Tallinn",
    "country": "Estonia",
    "countryCode": "EE",
    "latitude": 59.41329956049999,
    "longitude": 24.832799911499997
  },
  "SKG": {
    "city": "Thessaloniki",
    "country": "Greece",
    "countryCode": "GR",
    "latitude": 40.51969909667969,
    "longitude": 22.97089958190918
  },
  "VIE": {
    "city": "Vienna",
    "country": "Austria",
    "countryCode": "AT",
    "latitude": 48.110298156738,
    "longitude": 16.569700241089
  },
  "VNO": {
    "city": "Vilnius",
    "country": "Lithuania",
    "countryCode": "LT",
    "latitude": 54.634102,
    "longitude": 25.285801
  },
  "WMI": {
    "city": "Warsaw",
    "country": "Poland",
    "countryCode": "PL",
    "latitude": 52.451099,
    "longitude": 20.6518
  },
  "ZAG": {
    "city": "Zagreb",
    "country": "Croatia",
    "countryCode": "HR",
    "latitude": 45.7429008484,
    "longitude": 16.0687999725
  },
  "ZRH": {
    "city": "Zurich",
    "country": "Switzerland",
    "countryCode": "CH",
    "latitude": 47.464699,
    "longitude": 8.54917
  },
  "AMM": {
    "city": "Amman",
    "country": "Jordan",
    "countryCode": "JO",
    "latitude": 31.7226009369,
    "longitude": 35.9931983948
  },
  "BGW": {
    "city": "Baghdad",
    "country": "Iraq",
    "countryCode": "IQ",
    "latitude": 33.262500762900004,
    "longitude": 44.2346000671
  },
  "BEY": {
    "city": "Beirut",
    "country": "Lebanon",
    "countryCode": "LB",
    "latitude": 33.820899963378906,
    "longitude": 35.488399505615234
  },
  "DMM": {
    "city": "Dammam",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "latitude": 26.471194,
    "longitude": 49.798583
  },
  "DOH": {
    "city": "Doha",
    "country": "Qatar",
    "countryCode": "QA",
    "latitude": 25.273056,
    "longitude": 51.608056
  },
  "DXB": {
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "latitude": 25.2527999878,
    "longitude": 55.3643989563
  },
  "INV12": {
    "city": "Erbil",
    "countryCode": "IQ"
  },
  "HFA": {
    "city": "Haifa",
    "country": "Israel",
    "countryCode": "IL",
    "latitude": 32.80939865112305,
    "longitude": 35.04309844970703
  },
  "JED": {
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "latitude": 21.6796,
    "longitude": 39.156502
  },
  "KWI": {
    "city": "Kuwait City",
    "country": "Kuwait",
    "countryCode": "KW",
    "latitude": 29.226600646972656,
    "longitude": 47.96889877319336
  },
  "BAH": {
    "city": "Manama",
    "country": "Bahrain",
    "countryCode": "BH",
    "latitude": 26.27079963684082,
    "longitude": 50.63359832763672
  },
  "MCT": {
    "city": "Muscat",
    "country": "Oman",
    "countryCode": "OM",
    "latitude": 23.593299865722656,
    "longitude": 58.284400939941406
  },
  "JRS": {
    "city": "Ramallah",
    "country": "Israel",
    "countryCode": "IL",
    "latitude": 31.864722,
    "longitude": 35.219167
  },
  "RUH": {
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "latitude": 24.957599639892578,
    "longitude": 46.69879913330078
  },
  "TLV": {
    "city": "Tel Aviv",
    "country": "Israel",
    "countryCode": "IL",
    "latitude": 32.01139831542969,
    "longitude": 34.88669967651367
  },
  "AMD": {
    "city": "Ahmedabad",
    "country": "India",
    "countryCode": "IN",
    "latitude": 23.0771999359,
    "longitude": 72.63469696039999
  },
  "ALA": {
    "city": "Almaty",
    "country": "Kazakhstan",
    "countryCode": "KZ",
    "latitude": 43.35210037231445,
    "longitude": 77.04049682617188
  },
  "GYD": {
    "city": "Baku",
    "country": "Azerbaijan",
    "countryCode": "AZ",
    "latitude": 40.467498779296875,
    "longitude": 50.04669952392578
  },
  "BWN": {
    "city": "Bandar Seri Begawan",
    "country": "Brunei Darussalam",
    "countryCode": "BN",
    "latitude": 4.944200038909912,
    "longitude": 114.9280014038086
  },
  "DMK": {
    "city": "Bangkok",
    "country": "Thailand",
    "countryCode": "TH",
    "latitude": 13.9125995636,
    "longitude": 100.607002258
  },
  "INV13": {
    "city": "Bengaluru",
    "country": "India",
    "countryCode": "IN",
    "latitude": 13.07674,
    "longitude": 77.597645
  },
  "INV14": {
    "city": "Bhubaneshwar",
    "countryCode": "IN"
  },
  "LLC": {
    "city": "Cagayan",
    "country": "Philippines",
    "countryCode": "PH",
    "latitude": 18.181111,
    "longitude": 121.745
  },
  "CEB": {
    "city": "Cebu",
    "country": "Philippines",
    "countryCode": "PH",
    "latitude": 10.307222,
    "longitude": 123.978889
  },
  "IXC": {
    "city": "Chandigarh",
    "country": "India",
    "countryCode": "IN",
    "latitude": 30.673500061035156,
    "longitude": 76.78849792480469
  },
  "MAA": {
    "city": "Chennai",
    "country": "India",
    "countryCode": "IN",
    "latitude": 12.990005493164062,
    "longitude": 80.16929626464844
  },
  "CNX": {
    "city": "Chiang Mai",
    "country": "Thailand",
    "countryCode": "TH",
    "latitude": 18.766799926799997,
    "longitude": 98.962600708
  },
  "CGP": {
    "city": "Chittagong",
    "country": "Bangladesh",
    "countryCode": "BD",
    "latitude": 22.24959945678711,
    "longitude": 91.81330108642578
  },
  "CMB": {
    "city": "Colombo",
    "country": "Sri Lanka",
    "countryCode": "LK",
    "latitude": 7.180759906768799,
    "longitude": 79.88410186767578
  },
  "DAC": {
    "city": "Dhaka",
    "country": "Bangladesh",
    "countryCode": "BD",
    "latitude": 23.843347,
    "longitude": 90.397783
  },
  "FUK": {
    "city": "Fukuoka",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 33.585899353027344,
    "longitude": 130.4510040283203
  },
  "HAN": {
    "city": "Hanoi",
    "country": "Viet Nam",
    "countryCode": "VN",
    "latitude": 21.221200942993164,
    "longitude": 105.80699920654297
  },
  "SGN": {
    "city": "Ho Chi Minh City",
    "country": "Viet Nam",
    "countryCode": "VN",
    "latitude": 10.8187999725,
    "longitude": 106.652000427
  },
  "HKG": {
    "city": "Hong Kong",
    "country": "Hong Kong",
    "countryCode": "HK",
    "latitude": 22.308901,
    "longitude": 113.915001
  },
  "HYD": {
    "city": "Hyderabad",
    "country": "India",
    "countryCode": "IN",
    "latitude": 17.231318,
    "longitude": 78.429855
  },
  "ISB": {
    "city": "Islamabad",
    "country": "Pakistan",
    "countryCode": "PK",
    "latitude": 33.549,
    "longitude": 72.82566
  },
  "CGK": {
    "city": "Jakarta",
    "country": "Indonesia",
    "countryCode": "ID",
    "latitude": -6.1255698204,
    "longitude": 106.65599823
  },
  "JSR": {
    "city": "Jashore",
    "country": "Bangladesh",
    "countryCode": "BD",
    "latitude": 23.183611,
    "longitude": 89.160833
  },
  "JHB": {
    "city": "Johor Bahru",
    "country": "Malaysia",
    "countryCode": "MY",
    "latitude": 1.64131,
    "longitude": 103.669998
  },
  "KNU": {
    "city": "Kanpur",
    "country": "India",
    "countryCode": "IN",
    "latitude": 26.404301,
    "longitude": 80.410103
  },
  "KHI": {
    "city": "Karachi",
    "country": "Pakistan",
    "countryCode": "PK",
    "latitude": 24.9065,
    "longitude": 67.160797
  },
  "KTM": {
    "city": "Kathmandu",
    "country": "Nepal",
    "countryCode": "NP",
    "latitude": 27.6966,
    "longitude": 85.3591
  },
  "CCU": {
    "city": "Kolkata",
    "country": "India",
    "countryCode": "IN",
    "latitude": 22.654699325561523,
    "longitude": 88.44670104980469
  },
  "KUL": {
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "latitude": 2.745579957962,
    "longitude": 101.70999908447
  },
  "LHE": {
    "city": "Lahore",
    "country": "Pakistan",
    "countryCode": "PK",
    "latitude": 31.5216007232666,
    "longitude": 74.40360260009766
  },
  "MFM": {
    "city": "Macau",
    "country": "Macao",
    "countryCode": "MO",
    "latitude": 22.149599,
    "longitude": 113.592003
  },
  "MLE": {
    "city": "Male",
    "country": "Maldives",
    "countryCode": "MV",
    "latitude": 4.191667,
    "longitude": 73.528889
  },
  "MDL": {
    "city": "Mandalay",
    "country": "Myanmar",
    "countryCode": "MM",
    "latitude": 21.702199935913086,
    "longitude": 95.97789764404297
  },
  "MNL": {
    "city": "Manila",
    "country": "Philippines",
    "countryCode": "PH",
    "latitude": 14.5086,
    "longitude": 121.019997
  },
  "BOM": {
    "city": "Mumbai",
    "country": "India",
    "countryCode": "IN",
    "latitude": 19.0886993408,
    "longitude": 72.8678970337
  },
  "NAG": {
    "city": "Nagpur",
    "country": "India",
    "countryCode": "IN",
    "latitude": 21.092199,
    "longitude": 79.047203
  },
  "OKA": {
    "city": "Naha",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 26.1958007812,
    "longitude": 127.646003723
  },
  "DEL": {
    "city": "New Delhi",
    "country": "India",
    "countryCode": "IN",
    "latitude": 28.5665,
    "longitude": 77.103104
  },
  "KIX": {
    "city": "Osaka",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 34.42729949951172,
    "longitude": 135.24400329589844
  },
  "PAT": {
    "city": "Patna",
    "country": "India",
    "countryCode": "IN",
    "latitude": 25.591299057,
    "longitude": 85.0879974365
  },
  "PNH": {
    "city": "Phnom Penh",
    "country": "Cambodia",
    "countryCode": "KH",
    "latitude": 11.546600341796875,
    "longitude": 104.84400177001953
  },
  "ICN": {
    "city": "Seoul",
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "latitude": 37.46910095214844,
    "longitude": 126.45099639892578
  },
  "SIN": {
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "latitude": 1.35019,
    "longitude": 103.994003
  },
  "URT": {
    "city": "Surat Thani",
    "country": "Thailand",
    "countryCode": "TH",
    "latitude": 9.13259983063,
    "longitude": 99.135597229
  },
  "TPE": {
    "city": "Taipei",
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 25.0777,
    "longitude": 121.233002
  },
  "TAS": {
    "city": "Tashkent",
    "country": "Uzbekistan",
    "countryCode": "UZ",
    "latitude": 41.257900238,
    "longitude": 69.2811965942
  },
  "TBS": {
    "city": "Tbilisi",
    "country": "Georgia",
    "countryCode": "GE",
    "latitude": 41.6692008972,
    "longitude": 44.95470047
  },
  "INV15": {
    "city": "Thimphu",
    "country": "Bhutan",
    "countryCode": "BT",
    "latitude": 27.4513,
    "longitude": 89.6557
  },
  "NRT": {
    "city": "Tokyo",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 35.764702,
    "longitude": 140.386002
  },
  "UBN": {
    "city": "Ulaanbaatar",
    "country": "Mongolia",
    "countryCode": "MN",
    "latitude": 47.646916,
    "longitude": 106.819833
  },
  "VTE": {
    "city": "Vientiane",
    "country": "Lao People's Democratic Republic",
    "countryCode": "LA",
    "latitude": 17.988300323500003,
    "longitude": 102.56300354
  },
  "RGN": {
    "city": "Yangon",
    "country": "Myanmar",
    "countryCode": "MM",
    "latitude": 16.907300949099998,
    "longitude": 96.1332015991
  },
  "EVN": {
    "city": "Yerevan",
    "country": "Armenia",
    "countryCode": "AM",
    "latitude": 40.1473007202,
    "longitude": 44.3959007263
  },
  "YIA": {
    "city": "Yogyakarta",
    "country": "Indonesia",
    "countryCode": "ID",
    "latitude": -7.905338,
    "longitude": 110.057264
  },
  "AQG": {
    "city": "Anquing",
    "country": "China",
    "countryCode": "CN",
    "latitude": 30.582222,
    "longitude": 117.050278
  },
  "IQN": {
    "city": "Baoji",
    "country": "China",
    "countryCode": "CN",
    "latitude": 35.7997222222,
    "longitude": 107.6027777778
  },
  "PEK": {
    "city": "Beijing",
    "country": "China",
    "countryCode": "CN",
    "latitude": 40.080101013183594,
    "longitude": 116.58499908447266
  },
  "CGD": {
    "city": "Yiyang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 28.9188995361,
    "longitude": 111.63999939
  },
  "CZX": {
    "city": "Changzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 31.919701,
    "longitude": 119.778999
  },
  "CTU": {
    "city": "Chengdu",
    "country": "China",
    "countryCode": "CN",
    "latitude": 30.578500747680664,
    "longitude": 103.9469985961914
  },
  "HAK": {
    "city": "Haikou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 19.934900283813477,
    "longitude": 110.45899963378906
  },
  "DLC": {
    "city": "Dalian",
    "country": "China",
    "countryCode": "CN",
    "latitude": 38.9656982421875,
    "longitude": 121.53900146484375
  },
  "FUO": {
    "city": "Foshan",
    "country": "China",
    "countryCode": "CN",
    "latitude": 23.083299636799996,
    "longitude": 113.069999695
  },
  "FOC": {
    "city": "Fuzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 25.935100555419922,
    "longitude": 119.66300201416016
  },
  "CAN": {
    "city": "Guangzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 23.39240074157715,
    "longitude": 113.29900360107422
  },
  "KWE": {
    "city": "Guiyang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 26.53849983215332,
    "longitude": 106.8010025024414
  },
  "HET": {
    "city": "Hohhot",
    "country": "China",
    "countryCode": "CN",
    "latitude": 40.851398,
    "longitude": 111.823997
  },
  "HFE": {
    "city": "Huainan",
    "country": "China",
    "countryCode": "CN",
    "latitude": 31.7800006866455,
    "longitude": 117.297996520996
  },
  "TNA": {
    "city": "Jinan",
    "country": "China",
    "countryCode": "CN",
    "latitude": 36.857200622558594,
    "longitude": 117.21600341796875
  },
  "YIW": {
    "city": "Jinhua",
    "country": "China",
    "countryCode": "CN",
    "latitude": 29.344722,
    "longitude": 120.032222
  },
  "NAY": {
    "city": "Langfang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 39.7827987670898,
    "longitude": 116.388000488281
  },
  "INV16": {
    "city": "Lanzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 35.91780090332031,
    "longitude": 104.21800231933594
  },
  "ZHA": {
    "city": "Maoming",
    "country": "China",
    "countryCode": "CN",
    "latitude": 21.266666666667,
    "longitude": 110.46666666667
  },
  "KHN": {
    "city": "Nanchang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 28.864999771118164,
    "longitude": 115.9000015258789
  },
  "TAO": {
    "city": "Qingdao",
    "country": "China",
    "countryCode": "CN",
    "latitude": 36.2661018372,
    "longitude": 120.374000549
  },
  "BPE": {
    "city": "Qinhuangdao",
    "country": "China",
    "countryCode": "CN",
    "latitude": 39.666389,
    "longitude": 119.058889
  },
  "JJN": {
    "city": "Quanzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 24.7964,
    "longitude": 118.589996
  },
  "JUZ": {
    "city": "Quzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 28.965799,
    "longitude": 118.899002
  },
  "PVG": {
    "city": "Shanghai",
    "country": "China",
    "countryCode": "CN",
    "latitude": 31.143400192260742,
    "longitude": 121.80500030517578
  },
  "SHE": {
    "city": "Shenyang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 41.639801025390625,
    "longitude": 123.48300170898438
  },
  "WDS": {
    "city": "Shiyan",
    "country": "China",
    "countryCode": "CN",
    "latitude": 32.591667,
    "longitude": 110.907778
  },
  "XUZ": {
    "city": "Suqian",
    "country": "China",
    "countryCode": "CN",
    "latitude": 34.059056,
    "longitude": 117.555278
  },
  "HYN": {
    "city": "Taizhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 28.562222,
    "longitude": 121.428611
  },
  "WUX": {
    "city": "Wuxi",
    "country": "China",
    "countryCode": "CN",
    "latitude": 31.494400024399997,
    "longitude": 120.429000854
  },
  "XIY": {
    "city": "Xianyang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 34.437806,
    "longitude": 108.756556
  },
  "XNN": {
    "city": "Xining",
    "country": "China",
    "countryCode": "CN",
    "latitude": 36.5275,
    "longitude": 102.042999
  },
  "YIC": {
    "city": "Xinyu",
    "country": "China",
    "countryCode": "CN",
    "latitude": 27.8025,
    "longitude": 114.3062
  },
  "INV17": {
    "city": "Yichang",
    "country": "China",
    "countryCode": "CN",
    "latitude": 30.671,
    "longitude": 111.4404
  },
  "CGO": {
    "city": "Zhengzhou",
    "country": "China",
    "countryCode": "CN",
    "latitude": 34.519699096699995,
    "longitude": 113.841003418
  },
  "ADL": {
    "city": "Adelaide",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -34.945,
    "longitude": 138.531006
  },
  "AKL": {
    "city": "Auckland",
    "country": "New Zealand",
    "countryCode": "NZ",
    "latitude": -37.008098602299995,
    "longitude": 174.792007446
  },
  "BNE": {
    "city": "Brisbane",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -27.384199142456055,
    "longitude": 153.11700439453125
  },
  "CBR": {
    "city": "Canberra",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -35.30690002441406,
    "longitude": 149.19500732421875
  },
  "INV18": {
    "city": "Guam",
    "country": "Guam",
    "countryCode": "GU",
    "latitude": 13.475863,
    "longitude": 144.812142
  },
  "MEL": {
    "city": "Melbourne",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -37.673302,
    "longitude": 144.843002
  },
  "NOU": {
    "city": "Noumea",
    "country": "New Caledonia",
    "countryCode": "NC",
    "latitude": -22.016389,
    "longitude": 166.216111
  },
  "PER": {
    "city": "Perth",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -31.94029998779297,
    "longitude": 115.96700286865234
  },
  "SYD": {
    "city": "Sydney",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -33.94609832763672,
    "longitude": 151.177001953125
  }
}
```

