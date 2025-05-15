#!/bin/bash

# Symlink config directories
ln -sf ~/dotfiles/.config/hypr ~/.config/hypr
ln -sf ~/dotfiles/.config/waybar ~/.config/waybar
ln -sf ~/dotfiles/.config/kitty ~/.config/kitty
ln -sf ~/dotfiles/.config/fish ~/.config/fish

# Symlink individual files
ln -sf ~/dotfiles/.bashrc ~/.bashrc

echo "Dotfiles installed and symlinked."