# Radio Frequencies

Revamp coming!!!

In the meantime, here's a brief overview. QR uses 3 radio systems:

- The "Enhanced Radio System" in SEQ (and a bit of Far West out to maybe Toowoomba) primarily for communications between drivers, guards and network control, which is a Tier III Digital Mobile Radio (DMR) system
- The "Train Control Radio", a Private Mobile Radio (PMR) system for voice communications between Rail Traffic Drivers, Rail Traffic Guards and Network Control Officers. This system is the primary mobile voice radio communications system outside of SEQ.
- Maintenance Supervisory Radio (MSR), an two-way analog UHF PMR radio system available on or adjacent to the rail corridor outside of SEQ. The MSR may also be used for communications between Infrastructure personnel and Network Control Officers or making PABX calls. The MSR can also provide two-way voice communications between Rail Traffic Drivers and Network Control Officers in the following situations: a) In areas where the TCR system is not installed b) When the TCR system is temporarily unavailable, e.g. a system failure.

Also check out:

- [http://www.grahamswebdesign.com/Queensland_Rail_Radio_Frequencies.html](http://www.grahamswebdesign.com/Queensland_Rail_Radio_Frequencies.html)
- [https://www.radioreference.com/db/sid/8527](https://www.radioreference.com/db/sid/8527)
- [https://brisbanenorthscan.tripod.com/index1.html/id21.html](https://brisbanenorthscan.tripod.com/index1.html/id21.html)
- [https://aussiescanners.com.au/forum/viewtopic.php?t=1125](https://aussiescanners.com.au/forum/viewtopic.php?t=1125)
- [https://aussiescanners.com.au/forum/viewtopic.php?t=7771&sid=55bb18f50acc5c5f82d51ca315323c40](https://aussiescanners.com.au/forum/viewtopic.php?t=7771&sid=55bb18f50acc5c5f82d51ca315323c40)

For listening to DMR and analog UHF, an SDR e.g. RTL-SDR, and [SDRTrunk](https://github.com/DSheirer/sdrtrunk/) is a pretty easy way if you already know all the frequencies and LCNs (for DMR). Unfortunately SDRTrunk cannot do PMR as far as I can tell. I haven't really looked into PMR yet.
