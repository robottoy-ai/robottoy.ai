PRIMER.topics.push(
{
  id: "electronics", name: "Electronics and power", asks: "Where does the power come from, and where does it go?",
  eli5: [
    "Think of water in pipes. Voltage is the pressure. Current is how much water flows. Power is how much work that water does each second. A battery is the tank.",
    "Most electrical trouble is one of three things: not enough pressure, too much flow, or water going where it should not."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="Power from the battery splits into useful work and heat"><rect x="20" y="50" width="70" height="50" fill="var(--tint)" stroke="currentColor"/><text x="55" y="80" text-anchor="middle" font-size="12">battery</text><path d="M90 75 H150" stroke="currentColor" fill="none"/><path d="M150 75 C190 75 190 45 230 45" stroke="var(--ok)" stroke-width="5" fill="none"/><path d="M150 75 C190 75 190 108 230 108" stroke="var(--bad)" stroke-width="12" fill="none"/><text x="236" y="49" font-size="12">useful work</text><text x="236" y="112" font-size="12">heat</text><text x="120" y="66" text-anchor="middle" font-size="12">power in</text></svg>',
  picCap: "All the power that goes in leaves as work or as heat. If you cannot say where it went, you have not finished.",
  ideas: [
    { t: "Volts, amps, watts", x: "Power in watts is volts times amps. The heat made in any wire or motor winding is the current squared times its resistance. Halve the current and the heat drops to a quarter.", p: "The walking motor draws 0.24 A at about 5 V: 1.2 W." },
    { t: "The energy budget", x: "A battery holds watt-hours: its volts times its amp-hours. Divide by the watts you draw and you get hours.", p: "2,000 mAh at 3.7 V is 7.4 Wh. Walking at 1.2 W, that is about six hours." },
    { t: "Rails", x: "Different parts want different voltages. A converter steps the battery up or down to each one, and wastes a little doing it. Each steady voltage line is called a rail.", p: "One brushless driver we looked at needs 8 V or more, so it cannot run from one cell without a step-up converter." },
    { t: "Motors and brains do not share", x: "A motor that suddenly draws a lot of current lowers the voltage for everything on the same line. A computer on that line resets. That dip is a brown-out. Give motors their own rail.", p: "Our rule: two rails, one shared ground, so a stalled motor cannot reboot the brain." },
    { t: "Signal is not power", x: "A microcontroller pin can say \"go\". It cannot supply the muscle. A driver chip takes that small signal and switches the big current.", p: "The ESP32 tells the driver. The driver feeds the motor." },
    { t: "Protection", x: "A lithium cell can deliver enough current to start a fire. A fuse or a self-resetting fuse limits it. Check which wire is plus before the first plug-in, every time.", p: "Our list has a 2 A resetting fuse on the battery." }
  ],
  jargon: [
    ["Voltage (V)", "Electrical pressure."],
    ["Current (A)", "Electrical flow."],
    ["Resistance (Ω)", "How much something restricts the flow."],
    ["Power (W)", "Work per second: volts times amps."],
    ["Wh, mAh", "How much a battery holds."],
    ["Rail", "A wire kept at one steady voltage."],
    ["Ground", "The shared return wire that all voltages are measured from."],
    ["Boost, buck converter", "Steps a voltage up, or down."],
    ["Brown-out", "A dip in voltage that makes electronics reset."],
    ["Driver, H-bridge", "The chip that switches a motor's power, in either direction."],
    ["Fuse, PTC", "A deliberate weak point that stops too much current. A PTC resets itself."],
    ["I2C, UART, USB", "Common ways for chips to talk to each other."]
  ],
  ask: ["Show me every consumer with its average and peak current.", "Which rail is each part on?", "What happens when a motor stalls or a wire shorts?", "What protects the battery?"],
  good: ["A table of loads with peaks, not just a total.", "Motors and brains on separate rails.", "The first power-on done on a limited supply, with the polarity checked."],
  bad: ["Motors fed from the brain board's 5 V pin.", "A lithium cell with no fuse.", "\"It is only 5 volts.\" Current, not voltage, is what burns."],
  story: { h: "Where 1.3 watts went", x: "A brushless motor with no gears could walk the penguin, doing 0.26 W of real work. But it made 1.3 W of heat. With no gears it needs a lot of current to make the torque, and heat goes with current squared. Put 8:1 gears on the same motor and the heat falls to 0.02 W. Same job, sixty times less heat. Always ask what the current is." },
  quiz: [
    ["A motor draws 0.5 A at 6 V. How many watts?", "3 W."],
    ["A battery holds 7.4 Wh. The robot draws 2 W. Roughly how long does it run?", "About three and a half hours."],
    ["Why does a motor on the same rail as the computer cause random resets?", "Its surges pull the voltage down, and the computer browns out."]
  ]
},
{
  id: "controls", name: "Controls and firmware", asks: "How does the machine know what it is doing, and correct itself?",
  eli5: [
    "Pour a glass of water with your eyes shut and you will spill. Open your eyes, watch the level, slow down near the top. That is the whole idea: look, compare, correct.",
    "Controls is \"eyes open\" for machines. Firmware is the small program that does the looking and correcting, many times a second."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="A control loop: compare the target with the measurement, correct, measure again"><rect x="20" y="40" width="64" height="34" fill="var(--tint)" stroke="currentColor"/><text x="52" y="62" text-anchor="middle" font-size="12">compare</text><rect x="128" y="40" width="64" height="34" fill="var(--tint)" stroke="currentColor"/><text x="160" y="62" text-anchor="middle" font-size="12">motor</text><rect x="236" y="40" width="64" height="34" fill="var(--tint)" stroke="currentColor"/><text x="268" y="62" text-anchor="middle" font-size="12">the thing</text><path d="M84 57 H128 M192 57 H236" stroke="currentColor" fill="none"/><path d="M268 74 V116 H52 V74" stroke="var(--motor)" stroke-width="2" fill="none"/><text x="160" y="110" text-anchor="middle" font-size="12" style="fill:var(--motor)">sensor reports back</text><text x="20" y="28" font-size="12">target in</text></svg>',
  picCap: "Without the blue line the machine is guessing.",
  ideas: [
    { t: "Open loop and closed loop", x: "Open loop: send a command and hope. Closed loop: measure what actually happened, compare it with what you wanted, and correct. That return path is called feedback.", p: "The cheap walking motor has no sensor, so it cannot know where its crank is." },
    { t: "You cannot control what you cannot measure", x: "Every closed loop needs a sensor. For motors the usual one reports the shaft's angle. It is called an encoder.", p: "A brushless motor needs one anyway, which is why it also \"knows\" its angle for free." },
    { t: "Too gentle, too fierce", x: "Correct too weakly and the machine is sluggish. Correct too strongly and it overshoots, corrects back, and shakes. Delay anywhere in the loop makes this worse. Tuning is finding the middle.", p: "A shower with a long pipe goes hot-cold-hot for the same reason: you react to old water." },
    { t: "On time, every time", x: "The loop must run at a steady rate. A program that is sometimes late is, for a motor, sometimes wrong. That is what real-time means.", p: "The penguin splits its brain: a small chip keeps time for the body, a bigger computer thinks." },
    { t: "Limits", x: "Every motor has a maximum. A good controller knows it, and knows what to do when it gets there: stop pushing, and tell someone.", p: "When the foot was held in the simulation, the motor hit its limit at once. That is how a stuck foot gets noticed." }
  ],
  jargon: [
    ["Feedback", "Measuring the result and feeding it back into the command."],
    ["Open loop, closed loop", "Without feedback, with feedback."],
    ["Setpoint", "The value you want."],
    ["Error", "The gap between what you want and what you have."],
    ["Gain", "How hard the controller reacts to an error."],
    ["PID", "The most common recipe for turning error into a correction."],
    ["Stable, unstable", "Settles down, or shakes worse and worse."],
    ["Latency, lag", "Delay between cause and reaction."],
    ["Encoder", "A sensor that reports a shaft's angle."],
    ["Real-time", "Guaranteed to respond within a fixed time."],
    ["Microcontroller (MCU)", "A small, simple computer that runs one program reliably."],
    ["Firmware", "The program inside a device."],
    ["State machine", "A program written as named modes and the rules for switching."],
    ["FOC", "The control method that makes a brushless motor smooth and quiet."]
  ],
  ask: ["What is measured, how often, and how late does it arrive?", "What does it do at its limits?", "What happens if the sensor comes unplugged?", "What is the safe thing it falls back to?"],
  good: ["The loop drawn as a diagram.", "A plot of how it responds to a sudden change.", "A broken sensor handled on purpose."],
  bad: ["Tuned by feel, with no plots.", "A claim of precision with no sensor.", "A safety cut-off that depends on the slow computer being awake."],
  story: { h: "A beak that is 45 milliseconds late", x: "People notice a mouth that moves more than about 45 ms after its sound, but tolerate one that moves up to 125 ms early. A servo always lags its command a little. The solution costs nothing. The penguin makes its speech before it plays it. So it can send each beak command early by exactly the lag. Good control often means knowing your delay and acting ahead of it." },
  quiz: [
    ["Is a toaster with a timer open loop or closed loop?", "Open loop. It never looks at the toast."],
    ["A robot arm shakes when it should hold still. Name two likely causes.", "The gain is too high, or there is too much delay in the loop."],
    ["Can a motor with no sensor promise it is at a precise angle?", "No. If it slipped or stalled, nothing would tell it."]
  ]
},
{
  id: "simulation", name: "Simulation and modelling", asks: "How do you test a thing that does not exist yet?",
  eli5: [
    "A model is a pretend version of the thing, made of maths. A flight simulator is one. You can crash it a hundred times for free.",
    "But it only knows what you told it. Leave something out, and the model will happily lie to you with great precision."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="Three rungs of proof: simulation is cheapest and least true, the real product is most true and most expensive"><rect x="20" y="92" width="80" height="34" fill="var(--tint)" stroke="currentColor"/><text x="60" y="114" text-anchor="middle" font-size="12">simulation</text><rect x="120" y="60" width="80" height="34" fill="var(--tint)" stroke="currentColor"/><text x="160" y="82" text-anchor="middle" font-size="12">bench test</text><rect x="220" y="28" width="80" height="34" fill="var(--tint)" stroke="currentColor"/><text x="260" y="50" text-anchor="middle" font-size="12">real use</text><text x="20" y="142" font-size="12" style="fill:var(--muted)">cheap, fast, least true</text><text x="300" y="20" text-anchor="end" font-size="12" style="fill:var(--muted)">slow, costly, true</text></svg>',
  picCap: "Climb in order. Each rung catches what the one below cannot.",
  ideas: [
    { t: "A model is a list of assumptions", x: "Perfectly stiff parts. A guessed weight. No friction. Every one is a place where the model can differ from the world. Write them down and you know where to doubt.", p: "Ours assumed 0.7 kg, stiff parts, and friction of 0.25." },
    { t: "Make it reproduce something you already know", x: "Before trusting a new answer, check that the model gives a known one. A sum you can do by hand is enough.", p: "Geometry said the body should sway 5.3°. The simulation first said 13°. That gap exposed joints that were stretching like rubber." },
    { t: "Look for where it breaks", x: "One passing run proves little. Change one input at a time until it fails. The edge of failure is the useful result.", p: "The weight could sit 30 mm off in any direction. At 40 mm it started to fail." },
    { t: "The computer makes its own mistakes", x: "A simulation moves time forward in tiny steps. Bad settings create motion that no real object would make. It looks just as convincing as the real thing.", p: "One run reported the penguin moving backwards at 241 mm/s. That was my friction maths becoming unstable, not physics." },
    { t: "Know what it cannot tell you", x: "Some things are only in the real part: how well it was made, how it sounds, what a cheap motor really delivers. Name them and send them to the bench.", p: "Four items went on that list for the legs." }
  ],
  jargon: [
    ["Model", "A simplified stand-in for the real thing."],
    ["Assumption", "Something taken as true without checking."],
    ["Rigid body", "A part treated as perfectly stiff."],
    ["Contact", "How the model handles things touching."],
    ["Time step", "The tiny slice of time the computer advances each round."],
    ["Parameter", "An input number you can change."],
    ["Sweep", "Running many times while changing one parameter."],
    ["Sensitivity", "How much the result changes when an input changes."],
    ["Artefact", "A result caused by the method, not by reality."],
    ["Validation", "Checking the model against the real world."],
    ["Fidelity", "How closely a model matches reality."]
  ],
  ask: ["What did the model leave out?", "What known answer did it reproduce first?", "Show me a run where it fails.", "Did you change one thing at a time?", "What can this model not tell us?"],
  good: ["Assumptions listed next to the result.", "A failing case shown, with the limit it reveals.", "Agreement with a hand sum, stated as a number."],
  bad: ["A good-looking animation offered as proof.", "Only runs that passed.", "Numbers with six digits from inputs that were guesses.", "Nobody tried to break it."],
  story: { h: "Three times the simulation fooled me", x: "First I animated a blob on a path that I scripted, which proves nothing. Then the real-parts model swayed 13° because its joints were soft. Then the friction maths went unstable and threw the penguin backwards. Each time, what caught it was the same thing: I had a number I expected, and the result did not match. Always write down what you expect before you run it." },
  quiz: [
    ["A simulation shows your design working. What are the first three questions?", "What did it assume? What known result did it reproduce? Where does it fail?"],
    ["Why change only one input at a time?", "Otherwise you cannot tell which change caused the difference."],
    ["A result is wildly large. How do you tell a real effect from an artefact?", "Check it against a simple estimate, and see whether it survives a smaller time step or stiffer settings."]
  ]
},
{
  id: "cad", name: "CAD and geometry", asks: "How do you describe a shape exactly enough to make it?",
  eli5: [
    "CAD is a drawing made for a machine. The machine does exactly what the file says, including the mistakes.",
    "A picture of a thing only has to look right. A file that will be manufactured has to be right everywhere, including the places nobody looks."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="A peg and its hole need a planned gap; with no gap the parts will not go together"><rect x="30" y="40" width="100" height="70" fill="var(--tint)" stroke="currentColor"/><rect x="62" y="40" width="36" height="46" fill="var(--bg)" stroke="currentColor"/><rect x="66" y="18" width="28" height="62" fill="var(--move)"/><text x="80" y="130" text-anchor="middle" font-size="12">planned gap: fits</text><rect x="190" y="40" width="100" height="70" fill="var(--tint)" stroke="currentColor"/><rect x="222" y="40" width="36" height="46" fill="var(--bg)" stroke="currentColor"/><rect x="222" y="10" width="36" height="34" fill="var(--bad)"/><text x="240" y="130" text-anchor="middle" font-size="12">no gap: will not go in</text></svg>',
  picCap: "Nothing is ever made to its exact size. The gap is part of the design.",
  ideas: [
    { t: "Skin or solid", x: "A mesh is a skin of small triangles. A solid knows its inside from its outside. To be made, a shape must be closed, with no holes in the skin. That is called watertight.", p: "The penguin shape arrived as 149 loose patches with cracks between them. It had to be sealed into one closed body before anything could be printed." },
    { t: "One agreed zero", x: "Pick one origin and one set of directions, and measure everything from them. That reference is the datum. Without it, two correct parts will not line up.", p: "Ours: feet on zero height, beak pointing forward, left and right mirrored." },
    { t: "Add, subtract, overlap", x: "Shapes are built by joining solids, cutting one out of another, or keeping only where they overlap. A hole is a cylinder subtracted.", p: "The servo hole is a box subtracted from the stand." },
    { t: "Clearance and tolerance", x: "Tolerance is how far a real part may differ from its drawing. Clearance is the gap you leave so the parts still fit when they do. Zero gap means it will not assemble.", p: "The servo hole is 0.3 mm bigger than the servo on each side." },
    { t: "Move it before you make it", x: "Put the parts together in the computer and move them through their whole travel. Measure any overlap. It is the cheapest test there is.", p: "The flipper touched the stand in two places. I found and removed both before printing." },
    { t: "Sizes come from somewhere", x: "Every dimension should trace back to a measurement, a datasheet, or a reason. A dimension from memory is a guess.", p: "The servo sizes in the test piece are from the datasheet, and are marked as unconfirmed until your photos arrive." }
  ],
  jargon: [
    ["CAD", "Computer-aided design: drawing parts in 3D."],
    ["Mesh, STL", "A shape stored as a skin of triangles."],
    ["Solid", "A shape that knows inside from outside."],
    ["Watertight, manifold", "A closed skin with no holes or overlaps."],
    ["Datum", "The agreed zero point and directions."],
    ["Boolean", "Joining, cutting or intersecting solids."],
    ["Tolerance", "How far a made part may differ from its drawing."],
    ["Clearance", "A deliberate gap between parts."],
    ["Fit", "How two parts go together: loose, sliding or pressed."],
    ["Interference", "Two parts trying to occupy the same space."],
    ["Parametric", "Built from named numbers, so one change updates everything."],
    ["Section", "A slice through a part to see inside."]
  ],
  ask: ["Is each part one closed body?", "What is the datum?", "What are the clearances, and why those numbers?", "Was the full range of motion checked for collisions?", "Where did the size of each bought part come from?"],
  good: ["Checks that print pass or fail.", "Real parts measured, not remembered.", "The same numbers used in every file."],
  bad: ["Looks right from one angle.", "Zero clearance between parts that must move.", "Sizes typed from memory."],
  story: { h: "The flipper that was inside out", x: "The first flipper I cut from the model was not a closed shape. Its skin also faced inward, so the computer calculated a negative volume. Nothing looked wrong on screen. A one-line check, \"is this a single closed body?\", caught it. Shapes fail in ways the eye cannot see, so let the computer check them." },
  quiz: [
    ["Two parts are each made exactly to the drawing, yet do not line up. What is the likely cause?", "They were measured from different datums."],
    ["A peg is 6.0 mm and its hole is 6.0 mm. Will it go in?", "Probably not. Real parts vary, and printed holes are smaller than drawn. Plan a gap."],
    ["What is the cheapest test of a moving assembly?", "Move it through its full travel in CAD and measure the overlap."]
  ]
});
