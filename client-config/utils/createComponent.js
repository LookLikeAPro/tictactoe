var fs = require("fs");

function make(folder, component) {
	fs.mkdirSync("./client-app/"+folder);
	fs.writeFileSync("./client-app/"+folder+"/index.jsx", "export default from \"./"+component+".jsx\";\n");
	fs.writeFileSync("./client-app/"+folder+"/"+component+".scss", "");
	fs.writeFileSync("./client-app/"+folder+"/"+component+".jsx", "import React, {Component, PropTypes} from \"react\";\nimport styles from \"./"+component+".scss\";\n\nexport default class "+component+" extends Component {\n	render() {\n		return false;\n	}\n}\n");
}

var path = process.argv[2];

if (path && path.length > 0) {
	var arr = path.split("/");
	make(path, arr[arr.length-1]);
}
else {
	console.log("No args");
}
