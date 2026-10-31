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
];

export default LAB_QUESTIONS;
