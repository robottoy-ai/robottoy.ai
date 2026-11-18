PRIMER.topics.push(
{
  id: "making", name: "Making it", asks: "Can this shape actually be made, and will it be strong where it matters?",
  eli5: [
    "A 3D printer is a very precise hot-glue gun. It draws one thin layer, then the next on top, from the bottom up. It cannot draw in mid-air.",
    "Every way of making things has rules like that. A design that ignores them is only a picture."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="Layers stack fine on a gentle slope but a steep overhang has nothing under it"><g stroke="currentColor" fill="var(--tint)"><rect x="30" y="104" width="90" height="10"/><rect x="36" y="94" width="90" height="10"/><rect x="42" y="84" width="90" height="10"/><rect x="48" y="74" width="90" height="10"/></g><text x="84" y="134" text-anchor="middle" font-size="12">gentle slope: prints</text><g stroke="currentColor" fill="var(--tint)"><rect x="190" y="104" width="40" height="10"/><rect x="190" y="94" width="40" height="10"/><rect x="190" y="84" width="40" height="10"/></g><rect x="190" y="74" width="100" height="10" fill="var(--bad)"/><text x="262" y="100" text-anchor="middle" font-size="12">nothing below</text><text x="240" y="134" text-anchor="middle" font-size="12">overhang: needs support</text></svg>',
  picCap: "Each layer needs something under most of it.",
  ideas: [
    { t: "Layers and overhangs", x: "A layer can lean out a little over the one below. Past about 45 to 50 degrees it sags or falls. The printer can build throwaway scaffolding called supports, but they leave a rough surface and are hard to remove from pockets.", p: "The test stand prints flat on its back with no supports. The curved flipper needs them." },
    { t: "Which way up decides everything", x: "A printed part is strong along its layers and weak between them, like a stack of paper. The way it sits on the bed sets its strength, its surface and its print time.", p: "The stand's base is printed standing up so the servo hole needs no support." },
    { t: "Walls carry the load", x: "The outside walls give most of the strength. The inside is a sparse lattice called infill. More walls help more than more infill.", p: "Mechanical parts here use 3 walls and 20% infill. The first penguin used 2 and 15%." },
    { t: "The machine believes the file", x: "A program called a slicer turns the shape into the printer's moves and temperatures. If its settings are wrong, the printer will carry them out without complaint. Read the output before sending it.", p: "My first sliced file said 7 hours, 0 grams, and the wrong temperature. The settings did not load, and no message said so. I discarded the file." },
    { t: "Make the risky bit small first", x: "Print only the joint you are unsure about, as a small test piece, before the whole part.", p: "A 2-hour flap test piece instead of a 20-hour shell that might not work." },
    { t: "Prototype rules are not factory rules", x: "Printing forgives shapes that a factory mould cannot make, and the reverse. A product for thousands gets redesigned for its real process. That is called design for manufacture.", p: "The shell is printed now and is meant to be moulded later." }
  ],
  jargon: [
    ["FDM", "The common kind of 3D printing: melted plastic laid down in layers."],
    ["Filament, PLA", "The plastic wire the printer melts. PLA is the easy, stiff kind."],
    ["Layer height", "The thickness of each layer, often 0.2 mm."],
    ["Overhang", "A part of a layer with nothing under it."],
    ["Support", "Throwaway scaffolding printed under overhangs."],
    ["Bed", "The plate the part is built on."],
    ["Slicer", "The program that turns a shape into printer instructions."],
    ["G-code", "Those instructions."],
    ["Wall, perimeter", "The solid outer shell of each layer."],
    ["Infill", "The sparse pattern inside."],
    ["Heat-set insert", "A brass thread melted into plastic so screws can be reused."],
    ["DFM", "Design for manufacture: shaping a part to suit how it will be made."]
  ],
  ask: ["Which way up is it printed, and why?", "Where are the supports?", "Which direction will it be loaded, compared with the layers?", "Was the sliced file read before printing?", "Is there a small test piece first?"],
  good: ["Orientation chosen on purpose and written down.", "Holes drawn slightly oversize, because they print small.", "Time, grams and temperatures checked against expectation."],
  bad: ["\"Just print it.\"", "Supports inside a pocket that has to fit something.", "Trusting the slicer's summary line."],
  story: { h: "Seven hours, zero grams", x: "The slicer reported success. The file said the print would take 7 hours and use 0 grams of plastic, at the wrong temperature, on a bed the wrong size. The tool ignored the printer's settings and did not say so. A \"success\" message is not evidence. The numbers in the output are." },
  quiz: [
    ["Why not print a hook standing upright, with the load pulling the layers apart?", "Printed parts are weakest between layers. Lay it so the load runs along them."],
    ["You need a 3.0 mm hole for a pin. What do you draw?", "Slightly larger, about 3.2 mm. Printed holes are smaller than drawn."],
    ["The slicer says \"success\". What do you check before printing?", "Time, grams, temperatures and bed size against what you expect."]
  ]
},
{
  id: "systems", name: "Systems thinking", asks: "How do many parts become one product that works?",
  eli5: [
    "Clay can be any shape, but two lumps do not join by themselves. LEGO bricks always join, because someone decided the studs first.",
    "Systems engineering is deciding the studs: what each part must do, and exactly how the parts meet."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="What the job needs against what the part can give; the gap between them is the margin"><rect x="40" y="46" width="240" height="22" fill="var(--tint)" stroke="currentColor"/><rect x="40" y="46" width="60" height="22" fill="var(--motor)"/><text x="40" y="38" font-size="12">needs</text><text x="280" y="38" text-anchor="end" font-size="12">can give</text><path d="M100 82 H280" stroke="var(--ok)" stroke-width="2"/><path d="M100 76 V88 M280 76 V88" stroke="var(--ok)" stroke-width="2"/><text x="190" y="104" text-anchor="middle" font-size="12" style="fill:var(--ok)">margin</text><text x="160" y="132" text-anchor="middle" font-size="12" style="fill:var(--muted)">no stated margin means nobody measured</text></svg>',
  picCap: "The one picture every engineering claim should be able to produce.",
  ideas: [
    { t: "A requirement has a number and a test", x: "\"It walks\" is a wish. \"It walks at 50 mm a second on a desk, measured over one metre\" is a requirement. If you cannot test it, you cannot build to it.", p: "That number later showed the first crank was too slow: 36, not 50." },
    { t: "Interfaces", x: "The places where two parts meet: a screw pattern, a plug, a message. Agree them first and each part can be built and repaired on its own.", p: "The pin map says which wire goes to which motor. The beak's servo got pin 10." },
    { t: "Break it into layers", x: "Give each layer one job and its own test. When something fails, you know which layer to open.", p: "Shell, fastening, moving parts, electronics, wiring, sensing, skin: seven layers, tested in that order." },
    { t: "Budgets and margins", x: "Weight, power, torque, cost and space are shared. Keep each in a table: what is needed, what is available. The gap is the margin. No margin means no room for being wrong.", p: "The mass budget came to 669 g, and 67% of it is from measured or maker figures." },
    { t: "Trade-offs, written down", x: "Every choice costs something somewhere else. Write the options, what each costs, and why the losers lost. Then the choice can be revisited without starting over.", p: "Stepping against rolling: rolling was safer, you chose stepping for life-likeness, and the reasons are on file." },
    { t: "Kill the biggest risk first", x: "Find the assumption most likely to sink the project. Test it early, in the cheapest way that could prove it wrong.", p: "Simulate, then a small test piece, then a bench rig. Each is cheaper than a failure in the finished product." }
  ],
  jargon: [
    ["Requirement", "Something the product must do, with a number and a test."],
    ["Spec", "The written list of requirements."],
    ["Interface", "The agreed way two parts connect."],
    ["BOM", "Bill of materials: every part, with quantity and cost."],
    ["Budget", "A table tracking a shared resource such as weight or power."],
    ["Margin", "The gap between what is needed and what is available."],
    ["Trade-off", "Giving up one good thing to get another."],
    ["Risk", "Something that might fail, with how likely and how bad."],
    ["Critical path", "The chain of tasks that sets the finish date."],
    ["Integration", "Putting the parts together and making them work as one."],
    ["Test gate", "A check that must pass before the next stage starts."],
    ["Single source of truth", "One file that everything else copies from."]
  ],
  ask: ["What is the requirement, and how is it tested?", "What is the riskiest assumption, and when does it get tested?", "Show me the budgets.", "What was rejected, and why?", "If these two documents disagree, which one wins?"],
  good: ["Every claim traceable to a requirement.", "Rejected options listed with reasons.", "Parts tested alone before they are joined."],
  bad: ["Features with no numbers.", "Everything assembled at once, then debugged.", "Two documents that say different things."],
  story: { h: "The number nobody had checked", x: "The spec said walk at 50 mm a second. The crank design gave 36. Both numbers were in the files for days, and nobody compared them. When I compared them, the design had to change. Requirements only work if every design is held up against them, one line at a time." },
  quiz: [
    ["Turn \"the battery should last a long time\" into a requirement.", "For example: three days at 50 pats a day on one charge, measured from full to shutdown."],
    ["Why agree interfaces before building the parts?", "So each part can be built, tested and replaced without touching the others."],
    ["A design has exactly the torque it needs. Good?", "No. Zero margin means any error, wear or surprise breaks it."]
  ]
},
{
  id: "safety", name: "Safety and reliability", asks: "What happens when it is misused, stalls, or wears out?",
  eli5: [
    "Design for the worst day, not the demo day. A toy gets grabbed, dropped, sat on, and left switched on.",
    "The question is never \"does it work?\" It is \"what happens when it does not?\""
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="A chain with one deliberately weak link: you choose what breaks"><g fill="none" stroke="currentColor" stroke-width="5"><ellipse cx="60" cy="70" rx="26" ry="14"/><ellipse cx="104" cy="70" rx="26" ry="14"/><ellipse cx="216" cy="70" rx="26" ry="14"/><ellipse cx="260" cy="70" rx="26" ry="14"/></g><ellipse cx="160" cy="70" rx="26" ry="14" fill="none" stroke="var(--ok)" stroke-width="2.5" stroke-dasharray="5 3"/><text x="160" y="112" text-anchor="middle" font-size="12" style="fill:var(--ok)">the link you chose to give way</text><text x="160" y="134" text-anchor="middle" font-size="12" style="fill:var(--muted)">cheap, easy to reset, harmless</text></svg>',
  picCap: "Something always gives first. Good design picks which.",
  ideas: [
    { t: "The user is the biggest load", x: "The forces a machine makes doing its job are usually tiny beside what a hand can apply. Size the joints for the hand.", p: "Flapping needs 0.09 kgf·cm. A hand on the flipper tip can apply over 6." },
    { t: "Ask how each part fails", x: "For every part: how could it fail, what happens next, and how would we notice? This is the most useful hour you can spend on any design.", p: "A held foot stalls the motor. A stalled motor at full voltage exceeds its gearbox limit. So the driver's current gets capped." },
    { t: "Choose the weak link", x: "Decide in advance which cheap, harmless part breaks first: a link that releases and clicks back, a fuse that resets.", p: "The flipper's push link releases at about 1 kgf·cm, before the load can damage the servo's gears." },
    { t: "Fail to safe", x: "When something fails, the result must be the harmless state: motor off, standing still, cool.", p: "With nested soles the penguin can stop at any point of its step and stay standing." },
    { t: "Three things that hurt people", x: "In a small product: heat, pinching, and the battery. Each gets a rule and a test.", p: "No surface over 45 °C. No gap a finger fits into near moving soles. A fuse on the cell." },
    { t: "It has to keep working", x: "A part that works once may fail on the thousandth go. Wear, loosening screws and tired plastic are found by running many cycles, not by one demo.", p: "The plan asks for 10,000 walking cycles on the bench before the shell exists." }
  ],
  jargon: [
    ["Failure mode", "One specific way a part can fail."],
    ["FMEA", "A table of failure modes, their effects, and what is done about each."],
    ["Fail-safe", "Designed so a failure leads to a harmless state."],
    ["Stall cut-off", "Switching a motor off when it is blocked."],
    ["Pinch point", "A gap that closes and could trap a finger."],
    ["Factor of safety", "How many times stronger a part is than it needs to be."],
    ["Derating", "Running a part well below its maximum so it lasts."],
    ["Duty cycle", "The share of time something is working rather than resting."],
    ["Fatigue", "Failure from many small loads rather than one big one."],
    ["Abuse test", "Testing what happens when it is used wrongly."]
  ],
  ask: ["What is the worst thing a user will do to this?", "For this part: how does it fail, and then what?", "What gives way first, and did we choose that?", "What state does it end up in when power is lost?", "How many cycles has it actually run?"],
  good: ["Loads from misuse stated next to working loads.", "A named weak link.", "Limits enforced by something simple, not by the cleverest computer."],
  bad: ["\"Nobody would do that.\"", "Tested once, when new.", "A safety feature that needs software to be working."],
  story: { h: "The motor that can break its own gears", x: "The Pololu motor delivers up to 3 kgf·cm at stall. Its own gearbox is rated for 2. So if a foot is ever held while the motor has full voltage, it can damage itself. Nothing is wrong with the part. It just needs a current limit set below that level. Read the limits of every part against each other, not only against the job." },
  quiz: [
    ["A joint needs 0.1 kgf·cm to do its job. What should it be designed to survive?", "Whatever a hand can apply, which may be 50 times more. Or give it a weak link."],
    ["Why is a snap-off link better than a stronger servo?", "It limits the force everywhere at once, costs almost nothing, and resets by hand."],
    ["Where should a safety limit live: in the smart computer or the simple chip?", "The simple one. It keeps working when the smart one crashes."]
  ]
});

PRIMER.toolkit = {
  lede: "You do not need to do the engineering to judge it. You need a handful of questions that good work can always answer and weak work cannot. These seven work in every field on this site.",
  questions: [
    { q: "What must it do, as a number?", why: "Without a number there is nothing to check against.", weak: "\"It should be fast enough.\"", strong: "\"50 mm a second on a desk, measured over one metre.\"" },
    { q: "What carries the load?", why: "Force, current and heat all travel a path. Follow it from start to finish and the weak part shows itself.", weak: "A drawing with arrows that stop in mid-air.", strong: "\"Weight goes body, shaft, cam, foot, floor.\"" },
    { q: "Where does the energy go?", why: "It never vanishes. If the sums do not add up to what went in, something is missing.", weak: "Power in with no account of heat.", strong: "\"0.26 W of work and 0.9 W of heat.\"" },
    { q: "What is the margin?", why: "Need against capacity, for the peak and for all day. Small margins are where things break.", weak: "\"It's strong enough.\"", strong: "\"Needs 0.3, limit 2, safe all-day level 0.6.\"" },
    { q: "What did you assume?", why: "Every result stands on assumptions. The ones nobody wrote down are the ones that bite.", weak: "No list.", strong: "\"Stiff parts, 0.7 kg, friction 0.25. Not weighed yet.\"" },
    { q: "Who checked it who did not want it to be true?", why: "People find what they expect. A second, independent route catches what the first cannot see.", weak: "\"I ran it again and got the same.\"", strong: "\"A separate derivation gave the same 45% and 55%.\"" },
    { q: "What breaks first, and then what?", why: "Everything fails eventually. Good work has already decided how.", weak: "\"It won't break.\"", strong: "\"The link releases at 1 kgf·cm and clicks back on.\"" }
  ],
  habits: [
    ["Units first", "A number without a unit is not a number. Many mistakes are a unit that changed halfway."],
    ["Guess before you calculate", "Estimate to within ten times in your head. If the careful answer is far from the guess, one of them is wrong."],
    ["Predict before you test", "Write down what you expect. A surprise is information only if you had an expectation."],
    ["Change one thing", "Two changes at once teach you nothing about either."],
    ["Go to the source", "A maker's datasheet beats a seller's page, which beats memory."],
    ["Draw it", "If it cannot be drawn simply, it is not yet understood."]
  ],
  tells: {
    good: ["Numbers come with units, sources and a margin.", "Says what was not checked.", "Shows a case where it fails.", "Says \"I was wrong about this\" and what changed.", "The simple version came first."],
    bad: ["\"Should work.\" \"Roughly.\" \"Strong enough.\"", "A beautiful picture and no sums.", "Only successes are shown.", "Precision far beyond the quality of the inputs.", "A new problem appears and the old claim is quietly dropped."]
  },
  bridge: [
    ["A load path", "A call stack or a data flow: follow it end to end."],
    ["Margin", "Headroom: the gap between normal load and the limit."],
    ["A free-body diagram", "A debugger: it shows the real state, not the one you assumed."],
    ["Tolerance and clearance", "Input validation: plan for values that are not exactly what you expected."],
    ["An interface", "An API: agree it and both sides can change freely."],
    ["Simulation, bench, real use", "Unit test, integration test, production."],
    ["A weak link", "A circuit breaker or a timeout: fail in the place you chose."],
    ["A requirement with a test", "An acceptance test."]
  ],
  bridgeNote: "The big difference from software: you cannot undo a printed part or a burnt motor, and a test costs hours and money instead of seconds. So hardware people spend more thought before they build. That habit is the fundamental."
};
PRIMER.missing = "Not here yet, because we have not done the work: speech and language on the device, camera vision, and the behaviour firmware. They get their pages when we get to them.";
