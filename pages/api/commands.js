const func = () => {
  console.log(1);
};
const commandList = [
  {
    id: "help",
    command: "help",
    description: "to get list of all commands",
    func: {},
    subcommands: [],
  },
];
export default function handler(req, res) {
  res.status(200).json(commandList);
}
