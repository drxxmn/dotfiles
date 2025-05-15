#!/bin/bash

# Remove existing symlinks or directories
rm -rf ~/.config/hypr
rm -rf ~/.config/waybar
rm -rf ~/.config/kitty
rm -rf ~/.config/fish
rm -f ~/.bashrc
rm -f ~/.config/rofi

# Create new symlinks
ln -sf ~/dotfiles/.config/hypr ~/.config/hypr
ln -sf ~/dotfiles/.config/waybar ~/.config/waybar
ln -sf ~/dotfiles/.config/kitty ~/.config/kitty
ln -sf ~/dotfiles/.config/fish ~/.config/fish
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.config/rofi ~/.config/rofi


echo "Symlinks created successfully."
