# link-station-detection-algorithm
This project uses reactJS to calculate the most suitable LinkStation with respect to power. 
I implemented a function to solve the most suitable (most power) link station for a device 
at a given point (x,y). 

Each link station has a reach and power.

Link station formula:

power = (reach-device distance from a link station)^2
AND
if distance > reach , power fallback to 0 (Power = 0).

``` suitableLinkStation = (linkstation,device_point,cb) ```
* takes the 'linkstations' (array of linkstation... modelled as object ),
* point where the device is located.
* callback... for printing the suitatble link station point and power.

### installation
```
npm install
```
### build

```
npm run build
```

### deploy on local server
```
npm start
```
