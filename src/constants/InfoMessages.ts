export const InfoMessages = {
    WRONGINPUT: "Wrong input!",
    WRONGOPTION: "Command doesn\'t exist.",
    HELP: `
      Options:
        --action, -a    action to be launch
        --file, -f      file path
        --help, -h      list of available commands

        action           |  file  |
        ------------------------------------------------------------------------------------------
        reverse          |        | reverse string data
        transform        |        | transform string data to uppercase
        outputFile       | <path> | read data from <path>
        convertFromFile  | <path> | read csv data from <path> and convert it to json
        convertToFile    | <path> | read csv data from <path>, convert if to json and write to
                         |        | file with the same name but .json extension
    `,
};
