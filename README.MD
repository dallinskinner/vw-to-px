Node script to take a css file and find all vw values and output a new stylesheet with just those rules and declarations with the option of converting them to px at a given size

`node parse.js [path] [target-size(optional)]`

`node parse.js '../path/to/file.css'`

`node parse.js '../path/to/file.css' 1280`
