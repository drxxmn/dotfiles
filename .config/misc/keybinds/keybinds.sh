#!/bin/bash

# Caminho para o arquivo de configuração do Hyprland
keybinds="$HOME/dotfiles/.config/misc/keybinds/keybinds.txt"

keybinds1=$(cat "$keybinds")

# Usa o rofi para exibir as keybinds
echo "$keybinds1" | rofi -dmenu -theme ~/dotfiles/.config/misc/keybinds/keybinds.rasi -p "Keybinds"