import * as YamlParser from "./yaml-parser";
import { GenerateCode, CodeWriter } from "./code-writers";
import { readFileSync, createWriteStream, write, WriteStream } from "fs";

const headerComment =
`// ------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// ------------------------------------------------------------------------------`;

export function generate(yamlFilePath: string, tsFileName: string, header: string, footer: string) {

    let lineBreak = '\n';
    let yamlRaw = readFileSync(yamlFilePath, 'utf8');
    let yamlObj = YamlParser.parse(yamlRaw);
    let code = GenerateCode(yamlObj);
    let file = createWriteStream(tsFileName);
    file.write(headerComment + lineBreak + lineBreak);
    file.write(header + lineBreak);
    for (let line in code) {
        file.write('    ' + code[line].write() + lineBreak);
    }
    file.write(footer + lineBreak);
    file.end();
}