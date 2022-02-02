const commandList = [
  {
    id: "help",
    command: "help",
    description: "to get list of all commands",
    function: {},
    subcommands: [],
  },
];
export default function handler(req, res) {
  res.status(200).json(commandList);
}
