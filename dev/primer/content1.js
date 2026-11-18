window.PRIMER = window.PRIMER || { topics: [] };
PRIMER.topics.push(
{
  id: "statics", name: "Statics", asks: "Will it stand, hold, or tip over?",
  eli5: [
    "Weight pulls everything down, all the time. Statics finds what pushes back. If the pushes balance, the thing stays still. If they do not, it tips, slides or breaks.",
    "Stand on one foot. You lean until your weight is over that foot. That one move is most of the subject."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="Seen from above: weight inside the footprint stands, weight outside it tips"><rect x="20" y="40" width="110" height="70" fill="var(--tint)" stroke="currentColor"/><circle cx="75" cy="75" r="6" fill="var(--ok)"/><text x="75" y="130" text-anchor="middle" font-size="12">weight inside: stands</text><rect x="190" y="40" width="70" height="70" fill="var(--tint)" stroke="currentColor"/><circle cx="282" cy="75" r="6" fill="var(--bad)"/><text x="235" y="130" text-anchor="middle" font-size="12">weight outside: tips</text><text x="160" y="22" text-anchor="middle" font-size="12" fill="var(--muted)" style="fill:var(--muted)">footprint seen from above</text></svg>',
  picCap: "The box is the patch of floor between the points that touch it. The dot is where the weight acts.",
  ideas: [
    { t: "Centre of mass", x: "The one point where all the weight seems to act. You can balance the whole object on a finger placed under it.", p: "The penguin's is 8 mm forward of centre and 74 mm up, calculated from 669 g of shell and parts." },
    { t: "Support polygon", x: "The patch of floor between everything that touches it. Drop a plumb line from the centre of mass. If it lands inside the patch, the object stands. Outside, it tips.", p: "The first foot plates stopped 18 mm short of the centre, so on one foot the plumb line landed outside and the penguin tipped." },
    { t: "Force and moment", x: "A force is a push or a pull. A moment (also called torque) is a push multiplied by how far it is from the pivot. Same push, longer lever, more turning.", p: "A 25 g flipper whose weight sits 28 mm from the hinge needs 0.07 kgf·cm to hold up." },
    { t: "Free-body diagram", x: "Draw the object alone. Draw every force on it as an arrow, with its direction. If the arrows do not cancel, it moves. If you cannot draw it, you do not understand it yet.", p: "This is the drawing I skipped on the first walking design." },
    { t: "Friction", x: "Grip equals how hard two surfaces press together times a number for the pair of materials. A slider pushed off to one side presses on its own guide, makes its own friction, and can jam.", p: "Putting the foot guides near the centre line cut the motor load from 0.44 to 0.26 kgf·cm." }
  ],
  jargon: [
    ["Centre of mass (CoM)", "The balance point of an object."],
    ["Support polygon", "The area of floor enclosed by the contact points."],
    ["Statically stable", "Stands still without having to keep moving."],
    ["Moment, torque", "Turning effort: force times distance from the pivot."],
    ["kgf·cm and N·m", "Two units of torque. 1 kgf·cm is the weight of 1 kg on a 1 cm lever. 1 kgf·cm = 0.098 N·m."],
    ["Normal force", "How hard two surfaces press on each other."],
    ["Friction coefficient", "The grip number for a pair of materials, usually 0.1 to 1."],
    ["Free-body diagram", "A sketch of one object with every force on it."],
    ["Load path", "The chain of parts the weight travels through to reach the ground."],
    ["Binding", "A slider jamming because the push is off to one side."]
  ],
  ask: ["Where is the centre of mass, and how do you know?", "What touches the ground, and where exactly?", "Show me the free-body diagram.", "If it tips, which way does it go?"],
  good: ["Forces drawn with directions, not just described.", "A margin in millimetres between the plumb line and the edge of the footprint.", "Checked with the weight in the wrong place, not only where it was planned."],
  bad: ["\"It balances\" with no drawing.", "A slider demo instead of a worked sum.", "A force whose direction is never stated."],
  story: { h: "The waddle that rocked the wrong way", x: "My first walking page said the crank rocks the weight over the planted foot. I never calculated which way it rocks. It rocks toward the lifted foot. Both feet stayed loaded, 45% and 55%, and the penguin would have scrubbed in place. The lesson: the direction of a force is the first thing to check, and it costs one sketch." },
  quiz: [
    ["A lamp's weight sits outside the triangle made by its three legs. What happens?", "It falls over. The plumb line lands outside the support polygon."],
    ["Why is a long spanner easier than a short one?", "Moment is force times distance. A longer lever gives more turning for the same push."],
    ["A drawer jams when you push one corner. Why?", "The push is off to one side, so the drawer presses on its runners, and that pressing creates the friction that locks it."]
  ]
},
{
  id: "mechanisms", name: "Mechanisms", asks: "How does one motion turn into another?",
  eli5: [
    "A motor can only spin. A mechanism turns that spin into the motion you actually want: back and forth, up and down, a flap, a step.",
    "Bicycle pedals are one. Your legs go up and down, and the wheel goes round."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="A crank is a pin off centre on a spinning disc; a cam is a disc whose edge shape pushes a follower"><circle cx="80" cy="72" r="38" fill="var(--tint)" stroke="currentColor"/><circle cx="80" cy="72" r="3" fill="currentColor"/><circle cx="106" cy="72" r="6" fill="var(--move)"/><line x1="80" y1="72" x2="106" y2="72" stroke="currentColor"/><text x="80" y="132" text-anchor="middle" font-size="12">crank: pin off centre</text><path d="M205 72 A35 35 0 1 1 275 72 L262 72 A22 22 0 0 0 218 72 Z" fill="var(--tint)" stroke="currentColor"/><circle cx="240" cy="72" r="3" fill="currentColor"/><rect x="222" y="22" width="36" height="8" fill="var(--move)"/><text x="240" y="132" text-anchor="middle" font-size="12">cam: the edge is the plan</text></svg>',
  picCap: "Two ways to get useful motion out of a spinning shaft.",
  ideas: [
    { t: "Degrees of freedom", x: "How many separate ways a part can move. A door on hinges has one. Count them for every part. Too many and the thing is floppy. Too few and it jams.", p: "The leg unit has exactly one: turn the crank and every other part must follow." },
    { t: "Crank", x: "A pin set off centre on a spinning disc. The pin travels in a circle. The distance off centre sets how far things move.", p: "An 8 mm crank moves the foot 16 mm from end to end, so each step is 16 mm." },
    { t: "Cam", x: "A disc whose edge is shaped on purpose. A part resting on the edge moves in and out as the disc turns. Where the edge is a true circle, the part holds still. That holding still is called dwell.", p: "Our D-shaped cam holds the planted foot down for 200° of every turn." },
    { t: "Linkage", x: "Rigid bars joined by pins. Four bars in a loop can copy, swap or reshape a motion. Two equal, parallel arms copy an angle exactly.", p: "The flipper's push link uses that: the flipper turns exactly as far as the servo." },
    { t: "Slack", x: "Every joint has a little play. It only matters when the load changes direction, because then the parts swing across the gap and hit. Its name in gears is backlash.", p: "With the cam the load never reverses, so 6° of gear slack changed nothing." },
    { t: "You cannot get both", x: "A lever or a gear trades force for distance. More force means less travel, always.", p: "This is why a small servo can be strong: its gears trade away speed." }
  ],
  jargon: [
    ["Degrees of freedom (DOF)", "The number of independent ways something can move."],
    ["Kinematics", "The study of how things move, ignoring the forces."],
    ["Crank", "An off-centre pin on a rotating part."],
    ["Stroke", "The end-to-end travel of a part."],
    ["Cam and follower", "A shaped disc and the part that rides on its edge."],
    ["Dwell", "The part of a cam's turn where the follower does not move."],
    ["Linkage, four-bar", "Bars and pins arranged to pass motion along."],
    ["Push rod, link", "A bar that carries a push or pull between two arms."],
    ["Horn", "The plastic arm that fits on a servo's shaft."],
    ["Phase", "How far one cycle lags another. Half a turn apart is 180°."],
    ["Backlash", "Slack between meshing gear teeth."],
    ["Pivot, hinge", "A joint that allows turning only."]
  ],
  ask: ["How many degrees of freedom does it have? Count them with me.", "Show me one full cycle, not one pose.", "Where does the load change direction?", "What stops each part turning in ways it should not?"],
  good: ["The whole cycle drawn or animated.", "Clearance checked through the full travel. Our flipper was swept 0 to 60° with zero overlap.", "Every joint named: what it allows, what it blocks."],
  bad: ["Shown in only one position.", "Sliding guides carrying a sideways load.", "No thought about where the slack goes."],
  story: { h: "Stop doing the work at all", x: "The plain crank lifted the whole body 8 mm on every step. That is what hammered the gears at 4.1 kgf·cm, twice their limit. A springy coupling only got it down to the limit. The real solution was a cam that keeps the body at one height. Then the lifting never happens: 0.4 kgf·cm. When a load is too big, first ask whether the mechanism needs to create it." },
  quiz: [
    ["A crank pin is 10 mm from the centre. How far does the driven part travel end to end?", "20 mm. The stroke is twice the crank radius."],
    ["A mechanism looks fine in the drawing but jams when built. What is the first thing to count?", "Degrees of freedom. A jam usually means two parts each insist on a different path."],
    ["Why did gear slack stop mattering once we used the cam?", "Slack only hurts when the load reverses. The cam keeps the load pushing one way."]
  ]
},
{
  id: "dynamics", name: "Dynamics", asks: "What happens when things speed up, slow down, or hit?",
  eli5: [
    "Heavy things do not like to start moving, and they do not like to stop. An empty shopping trolley is easy to shove. A full one fights you, both ways.",
    "Dynamics is statics plus that stubbornness."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="The same stop spread over more time needs far less force"><line x1="30" y1="120" x2="300" y2="120" stroke="currentColor"/><rect x="50" y="20" width="14" height="100" fill="var(--bad)"/><text x="57" y="138" text-anchor="middle" font-size="12">hard stop</text><rect x="170" y="100" width="100" height="20" fill="var(--ok)"/><text x="220" y="138" text-anchor="middle" font-size="12">soft stop</text><text x="80" y="60" font-size="12">big force, short time</text><text x="170" y="92" font-size="12">small force, long time</text></svg>',
  picCap: "Both blocks have the same area. To stop something takes a fixed amount of push multiplied by time. You choose how to spend it.",
  ideas: [
    { t: "Force is mass times acceleration", x: "The push you need equals how heavy the thing is times how quickly you change its speed. Changing speed gently is cheap. Changing it suddenly is expensive.", p: "The head's greeting swing takes 1.2 seconds, so it needs under 0.01 kgf·cm." },
    { t: "Inertia when spinning", x: "For turning, what matters is how far the mass sits from the axis, and it counts squared. A long thin arm is far harder to swing than a short fat one of the same weight.", p: "Flap twice as fast and the torque to shake the flipper goes up four times." },
    { t: "Impact", x: "A hit is a speed change squeezed into a very short time, so the force is huge. Anything soft stretches the time and cuts the force.", p: "With a plain crank the body's up-and-down speed flipped at every footfall. That jolt went straight into the gears." },
    { t: "Energy goes somewhere", x: "Work is force times distance. Power is work per second. Energy never disappears. It becomes motion, height, or heat.", p: "Walking takes 0.26 W of real work. A gearless motor turned another 1.3 W into heat doing it." },
    { t: "Slow enough to ignore", x: "If things move much more slowly than they would swing or wobble on their own, you can treat each instant as standing still. That is called quasi-static, and it must be checked, not assumed.", p: "The body rocks in about 0.5 s if you leave it alone. The crank takes 1.1 s. That is slow enough, but only just." }
  ],
  jargon: [
    ["Mass and weight", "Mass is how much stuff. Weight is the pull of gravity on it."],
    ["Acceleration", "How quickly speed changes."],
    ["Inertia", "Resistance to a change of motion."],
    ["Moment of inertia", "Inertia for spinning. It depends on where the mass sits."],
    ["Impulse", "Force multiplied by the time it acts."],
    ["Work, energy", "Force times distance. Measured in joules."],
    ["Power", "Energy per second. Measured in watts."],
    ["Natural frequency", "The rate at which something swings when left alone."],
    ["Resonance", "Motion growing because pushes arrive at the natural frequency."],
    ["Quasi-static", "Slow enough that dynamics can be ignored."],
    ["Easing", "Starting and stopping a motion gradually."],
    ["Damping", "Whatever drains the energy out of a swing."]
  ],
  ask: ["Is it slow enough to treat as standing still? Compared with what?", "What is the fastest change of speed, and how short is it?", "Where does the energy go on each cycle?", "Give me the peak, not only the average."],
  good: ["Peak and average both stated.", "The speed of the drive compared with how fast the thing moves on its own.", "A deliberate search for hits and reversals."],
  bad: ["Only average numbers.", "\"The motor is strong enough\" with no mention of how fast.", "A model with no impacts in a machine that has footfalls."],
  story: { h: "The flipper is limited by speed, not strength", x: "The servo has twenty times the torque the flipper needs. So I expected no limit. But a servo also has a top speed, about 600° a second, and a 55° flap uses all of it at 3.5 beats a second. Above that the flipper simply cannot follow. The strongest number on a datasheet is rarely the one that stops you." },
  quiz: [
    ["Why can a hammer drive a nail that a steady push cannot?", "The hammer's stop takes a tiny fraction of a second, so the force is enormous for that instant."],
    ["You double the flap rate. What happens to the torque needed to shake the flipper?", "It goes up four times. It grows with the square of the rate."],
    ["Why do you bend your knees when you land a jump?", "It stretches the stopping time, which cuts the force."]
  ]
},
{
  id: "motors", name: "Motors", asks: "What can a motor really give, and for how long?",
  eli5: [
    "A motor is like a cyclist. It can push very hard or pedal very fast, but not both at once. And it can sprint only for a moment before it overheats.",
    "Choosing a motor is choosing where on that trade it will spend its day."
  ],
  pic: '<svg viewBox="0 0 320 150" role="img" aria-label="A motor gives its biggest push at zero speed and none at top speed, with a straight line between"><line x1="50" y1="20" x2="50" y2="120" stroke="currentColor"/><line x1="50" y1="120" x2="300" y2="120" stroke="currentColor"/><line x1="50" y1="30" x2="290" y2="120" stroke="var(--motor)" stroke-width="2.5"/><circle cx="226" cy="96" r="6" fill="var(--ok)"/><text x="56" y="26" font-size="12">stall: most push, no speed</text><text x="296" y="112" text-anchor="end" font-size="12">top speed, no push</text><text x="222" y="84" text-anchor="end" font-size="12">a healthy working point</text><text x="175" y="140" text-anchor="middle" font-size="12" style="fill:var(--muted)">speed</text><text x="24" y="76" font-size="12" style="fill:var(--muted)">push</text></svg>',
  picCap: "Every motor lives on a line like this. Work near the fast end and it stays cool.",
  ideas: [
    { t: "The torque-speed line", x: "Held still, a motor pushes its hardest. That is stall torque. Spinning free, it reaches top speed and pushes nothing. In between is a straight line. Any load picks one point on it.", p: "The Pololu 210:1: 3.0 kgf·cm at stall, 150 rpm free." },
    { t: "Gears trade speed for push", x: "A 210:1 gearbox makes the output 210 times stronger and 210 times slower. The gearbox is also a part that can break, with its own limit.", p: "That gearbox's limit is 2 kgf·cm, lower than the motor can deliver through it." },
    { t: "Push is current, heat is current squared", x: "The harder a motor pushes, the more electric current it draws. Heat rises with the square of the current. So a motor can push at its maximum only briefly. The safe all-day level is about a quarter of the stall current.", p: "Our legs need 0.24 A. The safe level for that motor is 0.40 A." },
    { t: "Voltage sets speed", x: "More volts, more speed. Switching the power on and off very fast (PWM) is how a controller gives a motor fewer volts.", p: "5 V gives 55 mm/s. 2.6 V gives a 25 mm/s stroll." },
    { t: "Kinds of motor", x: "A plain DC motor just spins. A servo is a motor, gears and a position controller in one box. A brushless motor has no rubbing contacts and needs a smarter driver. Use few gears with a brushless motor and you get one you can push back by hand: quasi-direct drive, or QDD.", p: "QDD with 8:1 gearing would run our legs with 0.02 W of heat." }
  ],
  jargon: [
    ["Stall torque", "The push when the shaft is held still. Not a working value."],
    ["No-load speed", "The speed with nothing attached."],
    ["Continuous rating", "What it can do all day without overheating."],
    ["Gear ratio", "How many motor turns make one output turn."],
    ["Gearmotor", "A motor with a gearbox built on."],
    ["Servo", "Motor, gears and a position controller together."],
    ["Brushed, brushless", "Whether rubbing contacts or electronics switch the current."],
    ["Driver", "The chip that switches the motor's power."],
    ["PWM, duty", "Power switched on and off quickly. Duty is the fraction of time it is on."],
    ["Back-drivable", "The output can be turned by hand, so the motor can feel outside forces."],
    ["QDD, direct drive", "Low gearing, or none, with a brushless motor."],
    ["Cogging", "The lumpy feel of a motor's magnets as it turns slowly."]
  ],
  ask: ["What torque and what speed does the job need, at the peak and all day?", "What fraction of the stall current is that?", "What gives out first: motor, gearbox, heat, or the power supply?", "Is that datasheet the maker's, and is our part that exact part?"],
  good: ["The working point marked on the torque-speed line.", "Margin stated for torque and for heat separately.", "A cheap copy of a part measured before it is trusted."],
  bad: ["Comparing stall torque with the load: \"it stalls at 2, we need 1, fine.\"", "The gearbox's own limit never mentioned.", "One speed number with no load attached to it."],
  story: { h: "Why 210:1 and not its neighbours", x: "Same motor, three gearboxes, all simulated on our legs from 5 V. The 298:1 could not reach full speed at all: 40 mm/s. The 150:1 reached it but drew 0.44 A when parts were sticky, over the safe 0.40 A. The 210:1 reached it at 0.24 A. The choice was not about the biggest number. It was the only one that passed every test." },
  quiz: [
    ["A motor stalls at 3 kgf·cm. Your load is a steady 2.5. Is that fine?", "No. That is most of its stall torque, so it draws most of its stall current and overheats. Aim for about a quarter."],
    ["You double the gear ratio. What happens to speed and to push?", "Speed halves, push roughly doubles. And the gearbox limit does not change."],
    ["A servo is twenty times stronger than the flipper needs. What can still limit it?", "Its top speed."]
  ]
});
