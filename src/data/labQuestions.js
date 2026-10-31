// Lab content is intentionally kept separate from the scored CCNA question bank.
// The first lab is presented as a guided, task-by-task study item. The source
// artwork contains the topology and original task wording; solution slices are
// revealed only after the learner selects each task.

const LAB_ONE_SOURCE = "/All%20LAbs/1.png";

export const LAB_QUESTIONS = [
  {
    id: "lab-1",
    type: "lab",
    questionNo: "Lab #1",
    labItemLabel: "ITEM 1 OF 27",
    sourceImage: LAB_ONE_SOURCE,
    sourceWidth: 1312,
    sourceHeight: 1199,
    sourceDisplayWidth: 1312,
    sourceDisplayHeight: 545,
    topologyCropHeight: 545,
    tasks: [
      {
        id: "lab-1-task-1",
        label: "Task 1",
        text: "All relevant ports are pre-configured as 802.1q trunks.\nConfigure SW-1 port E0/0 to only permit VLANs 5 and 6.",
        solutionSlice: { x: 475, y: 600, width: 837, height: 132 },
      },
      {
        id: "lab-1-task-2",
        label: "Task 2",
        text: "Configure SW-1 and SW-2 ports e0/1 using VLAN 77 as the native VLAN.",
        solutionSlice: { x: 475, y: 732, width: 837, height: 153 },
      },
      {
        id: "lab-1-task-3",
        label: "Task 3",
        text: "Configure SW-2 port E0/2 to only permit VLAN 6.",
        solutionSlice: { x: 475, y: 885, width: 837, height: 129 },
      },
      {
        id: "lab-1-task-4",
        label: "Task 4",
        text: "Using LACP, create a Port Channel on SW-3 and SW-4.\nCombine e0/0 and e0/1 into a Port Channel while leaving the trunk configurations intact.\nAssign number 34.\nOnly SW-3 must negotiate.",
        solutionSlice: { x: 475, y: 1014, width: 837, height: 185 },
      },
    ],
  },
  {
    id: "lab-2",
    type: "lab",
    questionNo: "Lab #2",
    labItemLabel: "ITEM 2 OF 27",
    sourceImage: "/All%20LAbs/lab-2-supplied.png",
    sourceWidth: 1511,
    sourceHeight: 728,
    sourceDisplayWidth: 1000,
    sourceDisplayHeight: 728,
    tasks: [
      {
        id: "lab-2-task-1",
        label: "Task 1",
        text: "Configure OSPF on R2, Ensure R1 and R3 become neighbors.\n1, use process IO 30\n2 use 102222.22 as the router IO.",
        solutionSlice: { x: 995, y: 96, width: 516, height: 145 },
      },
      {
        id: "lab-2-task-2",
        label: "Task 2",
        text: "Under the OSPF process, advertise the following specific prefixes.\n10.0.23.0/28\n10.0.12.0/30",
        solutionSlice: { x: 995, y: 235, width: 516, height: 115 },
      },
      {
        id: "lab-2-task-3",
        label: "Task 3",
        text: "Ensure R2 always becomes the DR",
        solutionSlice: { x: 995, y: 145, width: 516, height: 105 },
      },
    ],
  },
  {
    id: "lab-3",
    type: "lab",
    questionNo: "Lab #3",
    labItemLabel: "ITEM 3 OF 27",
    sourceImage: "/All%20LAbs/lab-3-supplied.png",
    sourceWidth: 1247,
    sourceHeight: 737,
    sourceDisplayWidth: 860,
    sourceDisplayHeight: 737,
    tasks: [
      {
        id: "lab-3-task-1",
        label: "Task 1",
        text: "Configure SW1 and sw2 With VLANS using the naming on the topology.",
        solutionSlice: { x: 858, y: 72, width: 389, height: 190 },
      },
      {
        id: "lab-3-task-2",
        label: "Task 2",
        text: "Assign VLANS to the appropriate interfaces from the topology.",
        solutionSlice: { x: 858, y: 248, width: 389, height: 175 },
      },
      {
        id: "lab-3-task-3",
        label: "Task 3",
        text: "Ensure ports are set to voice and data as assigned on the topology.",
        solutionSlice: { x: 858, y: 385, width: 389, height: 175 },
      },
      {
        id: "lab-3-task-4",
        label: "Task 4",
        text: "Configure SW1 and sw2 for neighbor discovery using LLDP",
        solutionSlice: { x: 858, y: 540, width: 389, height: 197 },
      },
    ],
  },
  {
    id: "lab-4",
    type: "lab",
    questionNo: "Lab #4",
    labItemLabel: "ITEM 4 OF 27",
    sourceParts: [
      { id: "lab-4-topology", src: "/All%20LAbs/lab-4-topology.png", alt: "Original Lab 4 topology" },
      { id: "lab-4-guidelines", src: "/All%20LAbs/lab-4-guidelines.png", alt: "Original Lab 4 task guidelines" },
    ],
    tasks: [
      {
        id: "lab-4-task-1",
        label: "Task 1",
        text: "Configure R1 with the first usable host IP address in the 10.12.18.24/29 network.\nConfigure R2 with the last usable host IP address in the 10.12.18.24/29 network.",
        solutionImage: "/All%20LAbs/lab-4-solution.png",
        solutionWidth: 767,
        solutionHeight: 597,
        solutionSlice: { x: 0, y: 0, width: 767, height: 320 },
      },
      {
        id: "lab-4-task-2",
        label: "Task 2",
        text: "Configure R1 with the first usable host IP address in the 2001:db8:12::C/126 network.\nConfigure R2 with the last usable host IP address in the 2001:db8:12::C/126 network.",
        solutionImage: "/All%20LAbs/lab-4-solution.png",
        solutionWidth: 767,
        solutionHeight: 597,
        solutionSlice: { x: 0, y: 250, width: 767, height: 347 },
      },
    ],
  },
  {
    id: "lab-5",
    type: "lab",
    questionNo: "Lab #5",
    labItemLabel: "ITEM 5 OF 27",
    sourceParts: [
      { id: "lab-5-topology", src: "/All%20LAbs/lab-5-topology.png", alt: "Original Lab 5 topology" },
      { id: "lab-5-guidelines", src: "/All%20LAbs/lab-5-guidelines.png", alt: "Original Lab 5 task guidelines" },
    ],
    tasks: [
      {
        id: "lab-5-task-1",
        label: "Task 1",
        text: "Configure R1 with the first usable host IP address in the IPv4 network.\nConfigure R2 with the last usable host IP address in the IPv4 network.",
        solutionImage: "/All%20LAbs/lab-5-solution.png",
        solutionWidth: 693,
        solutionHeight: 597,
        solutionSlice: { x: 0, y: 0, width: 693, height: 320 },
      },
      {
        id: "lab-5-task-2",
        label: "Task 2",
        text: "Configure R1 with the first usable host IP address in the IPv6 network.\nConfigure R2 with the last usable host IP address in the IPv6 network.",
        solutionImage: "/All%20LAbs/lab-5-solution.png",
        solutionWidth: 693,
        solutionHeight: 597,
        solutionSlice: { x: 0, y: 250, width: 693, height: 347 },
      },
    ],
  },
];

export default LAB_QUESTIONS;
