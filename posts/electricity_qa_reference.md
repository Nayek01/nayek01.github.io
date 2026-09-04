---
title: "Electrical Engineering Fundamentals: Q&A Reference Guide"
date: "2026-09-04"
excerpt: "A comprehensive question and answer reference covering Ohm's law, AC vs DC power systems, transformers, and circuit protection principles."
author: "Ritwik Nayek"
tags: [Engineering, Electrical, Reference]
coverImage: "posts/images/electrical-guide.svg"
---

# Electrical Engineering Fundamentals: Q&A Reference Guide
### Q1: What is Ohm's Law?
**A:** Ohm's law states that the electric current flowing through a conductor is directly proportional to the voltage across it, provided the temperature and physical conditions remain constant.
* **Formula:** $V = I \times R$
* **V** = Voltage (measured in volts, V)
* **I** = Current (measured in amperes/amps, A)
* **R** = Resistance (measured in ohms, $\Omega$)
* **Derived Forms:** $I = \frac{V}{R}$ and $R = \frac{V}{I}$

---

### Q2: What is voltage and how does it work?
**A:** **Voltage is the electrical pressure** that pushes a flow of tiny charged particles called electrons through a wire or circuit. It is the electrical potential difference between two points, measured in **volts (V)**. Think of it like water pressure in a hose—higher pressure (voltage) means a stronger push to drive energy through your devices.

---

### Q3: Is it true that electricity flows in the opposite direction of electron flow?
**A:** **Yes, that is completely true.** Electricity (known as conventional current) flows from the **positive terminal (+)** to the **negative terminal (-)**. However, physical electrons are negatively charged, so they are repelled by the negative terminal and move toward the **positive terminal (+)**. 
* **Why?** In the 1700s, Benjamin Franklin guessed electricity flowed from positive to negative. By the time scientists discovered electrons moved the opposite way in 1897, the positive-to-negative standard was already locked in worldwide.

---

### Q4: Does that mean electricity flows in the opposite direction of the voltage push?
**A:** **No.** Voltage push and conventional electric current (electricity) flow in the **same direction**: from positive (+) to negative (-). Only the physical, negative electrons travel backward against this defined push.

---

### Q5: What is the difference between AC and DC in voltage and current?
**A:** **AC and DC mean the exact same thing whether you are talking about voltage or current.** They change together because AC voltage creates AC current, and DC voltage creates DC current.
* **DC (Direct Current/Voltage):** The voltage push is steady and always flows in **one single direction**. Electrons move forward in a steady loop. Found in batteries, solar panels, and electronics.
* **AC (Alternating Current/Voltage):** The voltage push constantly **switches its direction back and forth** (reversing 50 to 60 times per second, measured as 50Hz/60Hz). Electrons don't travel a long distance; they vibrate back and forth in place. Found in wall outlets.

---

### Q6: Why do we need DC in batteries, and why do our wall outlets use AC?
**A:** 
* **Batteries need DC** because they rely on internal chemical reactions. Chemistry can only drive a reaction in one steady direction, meaning a battery can only produce a one-way DC flow.
* **Wall outlets use AC** because of **transformers**. Electricity loses energy as heat over long distances. Transformers easily step AC up to ultra-high voltages for efficient travel across the country, and step it back down safely for your house. Transformers rely on changing magnetic fields, which means they **only work with AC**.

---

### Q7: How does a laptop charger convert AC from the wall into DC for a battery?
**A:** Your charger brick uses four main stages:
1. **Transformer (Step Down):** Lowers the high-voltage wall AC (120V/230V) down to a safer, low AC voltage (e.g., 19V AC).
2. **Rectifier (Diodes):** Passes the AC through electronic one-way valves. This blocks the current from moving backward, changing the two-way wave into a series of one-way bumpy hills.
3. **Filter (Capacitor):** Acts like a fast-acting water tank that fills during voltage peaks and releases energy during dips, smoothing the bumpy hills into a flat line.
4. **Regulator:** A microchip stabilizes the line to output a perfectly safe, steady DC voltage (e.g., exactly 19.5V DC) for the battery.

---

### Q8: How do transformers step up electricity?
**A:** A transformer uses two wire coils wrapped around an iron core. AC electricity entering the **Primary Coil** creates a rapidly changing magnetic field. The **Iron Core** channels this changing magnetism directly into the **Secondary Coil**. 
* **The Magic:** The Secondary Coil has **more loops (turns) of wire** than the Primary Coil. If it has 10 times more loops, the voltage push is multiplied 10 times higher.
* **The Catch:** According to the Law of Conservation of Energy, when voltage is stepped up, the **current drops by the exact same amount** ($Voltage \times Current = Power$).

---

### Q9: How do spinning generators switch the positive and negative terminals in AC?
**A:** In a power plant, electricity is created by spinning a giant magnet (with a North and South pole) inside copper wire coils. 
* **North Pole sweeps past:** It pushes electrons away from Terminal A and crowds them into Terminal B. Because electrons are negative, **Terminal B becomes Negative (-)** and Terminal A is left **Positive (+)**.
* **South Pole sweeps past:** It pulls electrons back, crowding them into Terminal A. Now, **Terminal A becomes Negative (-)** and Terminal B is left **Positive (+)**.
* This happens 50 to 60 times a second, causing the terminals to swap roles instantly.

---

### Q10: Will a solar panel ever run out of electrons since it continuously pushes them out?
**A:** **No, a solar panel operates in a perfectly closed loop.** The sun doesn't create electrons; it just acts like a foot pushing a bicycle chain. Sunlight knocks an electron loose from the top layer, it travels through the wire to power your device, and the wire guides it right back into an empty space in the bottom layer of the solar panel, resetting the cycle forever.

---

### Q11: If sunlight hits both layers, how do the electrons know where to go?
**A:** Sunlight passes right through the thin panel and knocks electrons loose in both layers. However, the internal boundary checkpoint (the junction between the two types of silicon) acts like a **one-way conveyor belt**. No matter where an electron gets kicked loose, the internal electrical force instantly slides it up to the **upper layer**, while empty spots migrate to the **bottom layer**. When a returned electron lands at the bottom, it waits until a new photon strikes it to ride the conveyor belt all over again.
