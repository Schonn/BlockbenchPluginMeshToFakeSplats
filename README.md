# Blockbench Plugin: Mesh To Pseudo Splats
Early WIP Plugin for BlockBench to instance 'splat' triangles with uniform uvs over the triangles of a source mesh for the purpose of generating pseudo gaussian-splat effects on imported sculpts. This plugin only aims to mimic the appearance of gaussian splats using traditional meshes within blockbench and does not implement real gaussian splatting.
Incorporates source from Malik12tree's MTools (https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/mesh_tools)

Sample output from sphere primitive generated in Blockbench:

<img width="406" height="396" alt="image" src="https://github.com/user-attachments/assets/777ce4a3-ab8a-4008-b64d-9527bc8df25a" />

# Installation
To install this plugin from within blockbench:

Download the splattools.js file from this repository.

Open the plugins menu from 'File > Plugins...'

Click on 'Load plugin from file' located to the right of the search bar at the top left of the plugins menu.

Select the splattools.js file from where you saved it.

# Usage
To use this plugin in BlockBench:

Generate a mesh from the BlockBench menu or import a mesh to use as a source to generate the pseudo-splats mesh from.

Select your imported mesh.

Click on 'Tools > Create splat instance mesh'.

Your pseudo-splats mesh will appear in the BlockBench outliner with the '_splats' postfix.

Click on 'Import Texture' in the 'TEXTURES' panel and import a transparent texture to use as a pseudo-splat texture. A rounded square with sparsely dithered edges and no feathering or antialiasing against a transparent background may work well. You may wish to create the splat texture centered, at the bottom of the transparent image and at roughly 50% of the image size so it will fit within each splat UV triangle.

Right click on your imported texture in the 'TEXTURES' panel and click on 'Apply to Elements'.

Select all of the UV islands in the 'UV' panel and scale them all up together so your splat texture fits inside the triangle.
