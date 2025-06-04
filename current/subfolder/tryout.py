#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 14 11:21:55 2024

@author: jeroenbenjamins
"""

import matplotlib.pyplot as plt
import numpy as np

def draw_path(total_length, long_side, short_side):
    current_length = 0
    lines_coordinates = []

    # Start from the top short side
    x1 = np.random.uniform(0, long_side)
    y1 = short_side
    lines_coordinates.append(((x1, y1), None))

    while current_length < total_length:
        # Randomly choose the next side to connect
        side = np.random.choice(['long_side', 'short_side', 'opposite_side'])

        if side == 'long_side':
            x2 = np.random.uniform(0, long_side)
            y2 = 0
        elif side == 'short_side':
            x2 = np.random.uniform(0, long_side)
            y2 = short_side
        else:  # opposite_side
            x2 = long_side
            y2 = np.random.uniform(0, short_side)

        # Calculate the length of the line segment
        length = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)

        # Check if adding the current line segment exceeds the total length
        if current_length + length <= total_length:
            # Add the line segment to the plot
            # ax.plot([x1, x2], [y1, y2], color='red')
            current_length += length

            # Store the coordinates of the line
            lines_coordinates[-1] = (lines_coordinates[-1][0], (x2, y2))
            lines_coordinates.append(((x2, y2), None))

            # Update starting point for the next line
            x1, y1 = x2, y2

    return lines_coordinates

# Rectangle dimensions
long_side = 200
short_side = 180

# Create a rectangle
rectangle = plt.Rectangle((0, 0), long_side, short_side, fill=None, edgecolor='black')
plt.gca().add_patch(rectangle)

# Generate the path and get coordinates
lines_coordinates = draw_path(3990, long_side, short_side)

# # Set plot limits
# plt.xlim(0, long_side)
# plt.ylim(0, short_side)

# # Show the plot
# plt.gca().set_aspect('equal', adjustable='box')
# plt.show()

# Display coordinates of each line
for i, ((x1, y1), (x2, y2)) in enumerate(lines_coordinates[:-1], start=1):
    print(f"Line {i}: ({x1}, {y1}) to ({x2}, {y2})")
