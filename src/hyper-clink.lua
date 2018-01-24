function hyper_powerline_prompt_filter()
	prompt = "[HYPERTERM_POWERLINE_CLINK_INJECT]{cwd}[END_CLINK_INJECT]"
	prompt = string.gsub(prompt, "{cwd}", clink.get_cwd())
	clink.prompt.value = prompt
end
