# Train Numbering Guide

Also check out [Run Guru](../Other/Resources/RunGuru.md) for a quick way to interpret train numbers!

## SEQ Electric Services

### 1st Number Designation

Rollingstock type.

`1` - 6 car SMU in revenue service <br>
`2` - 6 car SMU non-revenue service <br>
`A` - 6 car IMU non-revenue service <br>
`B` - 3 car IMU non-revenue service <br>
`C` - 3 car SMU non-revenue service <br>
`D` - NGR train in revenue service<br>
`E` - NGR non-revenue service<br>
`J` - 3 car SMU in revenue service <br>
`T` - 6 car IMU in revenue service <br>
`U` - 3 car IMU in revenue service <br>
`W` - Unknown. Possibly train equipped w/ L2 ETCS non-revenue service or test train <br>
`X` - Train equipped w/ L2 ETCS in revenue service <br>

### 2nd Number Designation

Destination range.

`0` - Electric Train Balloon; Bowen Hills or electric Train Shed South via Roma Street; Mayne area <br>
`1` - Dakabin - Caboolture <br>
`4` - Yandina - Gympie North <br>
`5` - Riverview - Ipswich <br>
`6` - Thomas Street - Rosewood <br>
`7` - Trinder Park - Beenleigh <br>
`8` - Lota - Cleveland <br>
`9` - Roma Street; ETS turnback via main lines <br>
`A` - Bindha - Banyo Yard - Shorncliffe <br>
`B` - Clayfield - Doomben / Pinkenba <br>
`C` - Corinda via South Brisbane; From Corinda to Yeerongpilly <br>
`D` - Milton - Redbank <br>
`E` - Windsor - Ferny Grove <br>
`F` - Various destinations as determined by Control: <br>
&nbsp;&nbsp;&nbsp; - 0-79 Brisbane District (3rd/4th char) <br>
&nbsp;&nbsp;&nbsp; - 80-89 Rockhampton District (3rd/4th char) <br>
&nbsp;&nbsp;&nbsp; - 90-99 Townsville District (3rd/4th char) <br>
`G` - Ormeau - Varsity Lakes <br>
`K` - Richlands - Springfield Central <br>
`L` - Elimbah - Nambour <br>
`M` - Electric Train Shed via Bowen Hills; Electric Balloon and suburban lines <br>
`N` - Exhibition via Brisbane Central <br>
`P` - International - Domestic (Airport) <br>
`R` - Roma Street; Electric Train Shed South via Suburban Lines <br>
`S` - South Brisbane - Park Road <br>
`U` - Wulkuraka NGR Maintenance Facility <br>
`V` - Dutton Park - Kuraby <br>
`W` - Albion - Northgate <br>
`X` - Exhibition Direct <br>
`Y` - Virginia - Kippa-Ring <br>
`Z` - Exhibition <br>

### Third Character

Used for denoting express and/or peak running, or empty unit specifics.

`0`-`9` - Standard running (all stations for suburban lines; all-day express patterns for interurban lines)<br>
`T`,`U`,`V` - AM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)<br>
`X`,`Y`,`Z` - PM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)<br>
`M`,`N` - PM peak only; Used to denote short-finishing PM peak services (Cleveland, Beenleigh lines)<br>
`P` - School train (e.g., `18P4`), may be cancelled during school holidays.<br>

**Note on Alphanumeric Characters:** With some timetables, third character alpha's are just a continuation of the numerals (IE: 0,1, 2 -> 8, 9, A, B etc.). For example, successive Airport trains might be `TP97`, `1P99`, `TPA1`, `1PA3`.

#### Special Running Codes (2nd + 3rd Character)

Some services use a specific combination of the 2nd and 3rd characters to denote a special route or event.

`xDYn` - Via South Brisbane to Darra (e.g., `1DY2`)<br>
`x5Yn` - Via South Brisbane to Ipswich (e.g., `15Y2`)<br>
`xxTn` - Extra service for special events etc. (e.g., `1GT4`)<br>
`xFXn` - Exhibition Circular Services (e.g., `1FX5`)<br>

### Fourth Character

Directional indicator

`even number` - Service concludes it's run travelling in the "Up" direction.<br>
`odd number` - Service concludes it's run travelling in the "Down" direction.<br>

## Regional Services

### 1st Character Designation

The first character defines the train type, motive power, and maximum speed.

`0` - Diesel-hauled Infrastructure Work Train<br>
`3` - Diesel-hauled passenger train (max 80km/h)<br>
`4` - Diesel-hauled empty coaches<br>
`5` - Railmotor in revenue service<br>
`6` - Diesel-hauled freight train (max 80km/h)<br>
`7` - Diesel-hauled freight train (max 60km/h)<br>
`8` - Diesel-hauled freight train (max 100km/h)<br>
`9` - Aurizon Diesel-hauled coal or mineral train<br>
`A` - Electric-hauled passenger train (max 100km/h)<br>
`B` - BMA Over-Length Electric-hauled coal or mineral train<br>
`B` - Electric-hauled empty coaches<br>
`C` - Electric-hauled freight train (max 80km/h)<br>
`C` - Pacific National Over-Length Electric-hauled coal or mineral train<br>
`D` - Electric-hauled freight train (max 60km/h)<br>
`E` - Aurizon Electric-hauled coal or mineral train<br>
`F` - Electric-hauled freight train (max 100km/h)<br>
`G` - Electric light engine<br>
`H` - Electric-hauled departmental/test train<br>
`J` - JMA Rail Electric-hauled coal or mineral train<br>
`K` - Standard Gauge train<br>
`L` - Diesel light engine(s)<br>
`M` - Pacific National Diesel-hauled coal or mineral train<br>
`M` - Steam-hauled passenger train<br>
`N` - Non-revenue railmotor<br>
`P` - Diesel-hauled passenger train (max 100km/h)<br>
`Q` - Electric Tilt Train (empty or revenue service)<br>
`R` - Pacific National Over-Length Diesel-hauled coal or mineral train<br>
`R` - Steam light engine or empty cars<br>
`S` - Diesel yard shunt engine<br>
`T` - Aurizon Over-Length Electric-hauled coal or mineral train<br>
`U` - Pacific National Diesel-hauled coal or mineral train<br>
`V` - Diesel Tilt Train (empty or revenue service)<br>
`Y` - Freight hauled by a 2800 class locomotive<br>
`Z` - On-track Machine / Hirail Vehicle<br>

### 2nd Character Designation

The second character defines the train's destination or operational area.

#### Coal & Mineral Systems

`1` - Saraji mine (Mackay Coal System) <br>
`2` - Goonyella (Mackay Coal System) <br>
`3` - Peak Downs (Mackay Coal System) <br>
`4` - Norwich Park (Mackay Coal System) <br>
`5` - German Creek (Mackay Coal System) <br>
`6` - Oaky Creek (Mackay Coal System) <br>
`7` - Blair Athol (Mackay Coal System) <br>
`8` - Riverside (Mackay Coal System) <br>
`9` - North Goonyella (Mackay Coal System) <br>
`A` - Abbott Point (Bowen Coal System) <br>
`B` - Curragh (Gladstone); Box Flat (Brisbane); Sonoma Mine (Newlands) <br>
`C` - Yongala (Gladstone Coal System) <br>
`D` - Callemondah (Gladstone Coal System) <br>
`E` - East End (Gladstone Limestone); Ensham (Gladstone); Ebenezer (Brisbane) <br>
`F` - Golding (Gladstone Coal System) <br>
`G` - Hay Point (Mackay Coal System) <br>
`H` - Boorgoon (Gladstone Coal System) <br>
`I` - Boonal (Gladstone Coal System) <br>
`J` - Jilalan (Mackay Coal System) <br>
`K` - Kinrola (Gladstone Coal System) <br>
`L` - Fishermans Landing (Gladstone Limestone); Laleham (Gladstone); Lake Vermont (Goonyella) <br>
`M` - Gregory (Gladstone Coal System) <br>
`N` - Newlands (Bowen Coal System); Koorilgah (Gladstone Coal System) <br>
`P` - Barney Point (Gladstone); Pring (Bowen Coal System) <br>
`Q` - Moura Mine (Gladstone Coal System) <br>
`R` - Callide Coalfields (Gladstone); Collinsville (Bowen); Burton (Mackay) <br>
`S` - McNaughton (Bowen); Boundary Hill/Callide to QAL (Gladstone); Boorgoon to Stanwell (Gladstone) <br>
`T` - Stuart-Calcium (Limestone); Moranbah North (Mackay Coal System) <br>
`V` - Dalrymple Bay (Mackay Coal System) <br>
`W` - Boundary Hill (Gladstone); Coppabella (Mackay); MacArthur (Mackay) <br>
`Y` - Gordonstone (Gladstone Coal System) <br>
`Z` - Gladstone Powerhouse (Gladstone); Mackay Harbour <br>

#### Major Regional Locations & Lines

`0` - Bowen Hills/Mayne Area <br>
`2` - Townsville <br>
`3` - Rockhampton <br>
`4` - Gympie North <br>
`5` - Beyond Darra to Grandchester (except Rosewood EMU services) <br>
`6` - Beyond Grandchester to Toowoomba <br>
`7` - Moolabin/Clapham/Acacia Ridge (Freight) <br>
`8` - Fisherman Islands (Freight) <br>
`9` - Roma Street <br>
`A` - Clermont; Forsayth <br>
`B` - Clermont <br>
`C` - Cairns <br>
`D` - Proserpine; Dalby <br>
`E` - Cloncurry; Emerald; Warwick <br>
`F` - Various destinations as determined by Control <br>
`G` - Gladstone; From Maryborough to Monto; Glenmorgan <br>
`H` - Dirranbandi; Hughenden <br>
`J` - Bundaberg; Jandowae <br>
`K` - Kingaroy; Kuranda <br>
`L` - Cobarra; Wandoan <br>
`M` - Mount Isa; Mareeba; Maryborough; From Gladstone to Monto <br>
`P` - Saint Lawrence; Milmerran; Springsure <br>
`Q` - Bowen; Quilpie <br>
`R` - Roma; Gracemere <br>
`S` - Sarina; Charleville <br>
`T` - Theodore; Phosphate Hill <br>
`U` - Mackay; Rolleston <br>
`V` - Cunnamulla; Biloela <br>
`W` - Wallangarra; Beyond Emerald to Winton; From Hughenden to Winton <br>
`Y` - Yaraka; Chinchilla; Yeppoon <br>

### 3rd Character Designation

If numeric, this is part of the train's ID. If alphabetic, it provides additional information. These are often locally agreed-upon characters.

**Pacific National**<br>
`P` - Signifies a freight train operated by Pacific National (e.g., `8CP1`).<br>

**Livestock Trains (Origin)**<br>
`N` - Northern Division<br>
`C` - Central Division<br>
`S` - Southern Division<br>

**Work Trains (Brisbane District)**<br>
Used with a 1st char `0` and 2nd char `F`.<br>
`B` - Ballast (`0FBn`)<br>
`C` - Concrete Sleepers (`0FCn`)<br>
`P` - Pantograph test train (`0FPn`)<br>
`R` - Railset (`0FRn`)<br>
`S` - Spoil/Sleepers (`0FSn`)<br>
`T` - Test Engine/Train (`0FTn`)<br>
`W` - Wiring Train (`0FWn`)<br>

**Gladstone Coal System (Boonal Loop Specific)**<br>
Used to differentiate coal from two mines.<br>
`I` - Jellinbah coal (e.g., `EInn`)<br>
`Y` - Yarrabee coal (e.g., `EIYn`)<br>

**Rockhampton District**<br>
`R` - Used with `63` prefix for Livestock trains from Gracemere to Rockhampton (e.g., `63R1`).

### 4th Character Designation

A numeric digit that is part of the train's ID and indicates its direction.

`even number` - Service concludes it's run travelling in the "Up" direction.<br>
`odd number` - Service concludes it's run travelling in the "Down" direction.<br>

**Exceptions:**

- For trains with a 2nd character of `F` (Various Destinations), the 4th character's parity does not necessarily indicate direction.
- Freight trains entering the Brisbane Suburban Area retain their original train number and directional digit, even if their direction of travel changes within the suburban network.
