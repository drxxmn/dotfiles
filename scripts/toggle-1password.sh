#!/bin/bash

# Check if a 1Password window exists (not just background process)
if hyprctl clients | grep -q "class: 1Password"; then
    # Window exists → toggle visibility
    hyprctl dispatch togglespecialworkspace scratchpad
else
    # No window → (re)launch 1Password
    hyprctl dispatch exec "1password"
fi
