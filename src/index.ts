#!/usr/bin/env node

import path from "path";
import chalk from "chalk";
import { program } from "commander";
import degit from "degit";
import figlet from "figlet";

// Display the title only once
if (!process.argv.slice(2).length) {
	console.log(
		chalk.blue(figlet.textSync("Dubu Packages", { horizontalLayout: "full" })),
	);
}

program
	.name("npx dubu")
	.description("CLI tool to add components from GitHub")
	.version("1.0.0");

// Command: add (positional argument for component name)
program
	.command("add <component>") // <component> makes it required, [component] makes it optional
	.description("Add a specific component from GitHub")
	.action(async (component) => {
		if (!component) {
			console.error(
				chalk.red(
					"❌ Please specify a component (e.g., bun dev add form_builder)",
				),
			);
			process.exit(1);
		}

		if (component === "form_builder") {
			const repoPath = "Subu19/form_builder/src/form-builder";
			const targetPath = path.join(process.cwd(), "src/form-builder");

			console.log(chalk.yellow("📥 Downloading form builder..."));

			try {
				const emitter = degit(repoPath, {
					cache: true,
					force: true,
					verbose: true,
				});

				await emitter.clone(targetPath);

				console.log(chalk.green("✅ Form builder added successfully!"));
				process.exit(1);
			} catch (err) {
				console.error(chalk.red("❌ Error downloading the component:"), err);
				process.exit(1);
			}
		} else {
			console.error(chalk.red(`❌ Unknown component: ${component}`));
			process.exit(1);
		}
	});

// Show help only if no arguments are provided
if (process.argv.length <= 2) {
	program.help();
}

program.parse(process.argv);
