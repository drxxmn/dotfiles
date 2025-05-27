#!/bin/bash

# Remove existing symlinks or directories
rm -rf ~/.config/hypr
rm -rf ~/.config/waybar
rm -rf ~/.config/kitty
rm -rf ~/.config/fish
rm -f ~/.bashrc
rm -f ~/.config/rofi
rm -f ~/.config/hypr/hyprlock.conf

mkdir -p ~/.local/share/icons/

# Create new symlinks
ln -sf ~/dotfiles/.config/hypr ~/.config/hypr
ln -sf ~/dotfiles/.config/waybar ~/.config/waybar
ln -sf ~/dotfiles/.config/kitty ~/.config/kitty
ln -sf ~/dotfiles/.config/fish ~/.config/fish
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.config/rofi ~/.config/rofi
ln -sf ~/dotfiles/.config/ags ~/.config/ags

# Symlink cursor theme
ln -sf ~/dotfiles/cursors/catppuccin-frappe-mauve-cursors ~/.local/share/icons/catppuccin-frappe-mauve-cursors
ln -sf ~/dotfiles/.config/fastfetch ~/.config/fastfetch


echo "Symlinks created successfully."
