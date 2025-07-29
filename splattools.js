let meshToSplatMeshButton;

Plugin.register('splattools', {
	title: 'Splat tools',
	author: 'Malik12tree, Pierre',
	description: 'Tools for turning triangulated mesh sculpts into splat-texture meshes',
	icon: 'fa-snowflake',
	version: '0.0.2',
	variant: 'both',
    onload() {
		meshToSplatMeshButton = new Action('instance_splat_tris', {
			name: 'Create splat instance mesh',
			description: 'Create a duplicate of the selected mesh with uniformly UV unwrapped, scaled up triangles instanced on each face of the original mesh.',
			icon: 'fa-up-down-left-right',
            click: function() {
				let createdMeshes = [];
                Undo.initEdit({
					elements: createdMeshes,
					selection: !0
				});
                const vertExpandDirection = [0, 0, 0];
                Mesh.selected.forEach(sceneObject => {
					let splattedMesh = new Mesh({vertices:{}});
					splattedMesh.name = sceneObject.name + "_splat";
					splattedMesh.rotation = sceneObject.rotation;
					splattedMesh.origin = sceneObject.origin;
					console.log(sceneObject);
					console.log(splattedMesh);
					for (const [faceID, faceObject] of Object.entries(sceneObject.faces)) {
						const faceVertObjects = [sceneObject.vertices[faceObject.vertices[0]],sceneObject.vertices[faceObject.vertices[1]],sceneObject.vertices[faceObject.vertices[2]]];
						const splatVertObjects = [[0,0,0],[0,0,0],[0,0,0]];
						const splatVertexIDs = [];
						const secondVertexToUseInScalingPair = [1,2,0];
						for (let vertexPairNumber = 0; vertexPairNumber < 3; vertexPairNumber++) {
							for (let vertPairScaleAxis = 0; vertPairScaleAxis < 3; vertPairScaleAxis++) {
								splatVertObjects[vertexPairNumber][vertPairScaleAxis] = faceVertObjects[vertexPairNumber][vertPairScaleAxis] + (faceVertObjects[vertexPairNumber][vertPairScaleAxis] - faceVertObjects[secondVertexToUseInScalingPair[vertexPairNumber]][vertPairScaleAxis]) * 0.5;
							}
						}
						for (let splatVertexNumber = 0; splatVertexNumber < 3; splatVertexNumber++) {
							splatVertexIDs[splatVertexNumber] = splattedMesh.addVertices(splatVertObjects[splatVertexNumber])[0];
						}
						let firstVertexID = splatVertexIDs[0];
						let secondVertexID = splatVertexIDs[1];
						let thirdVertexID = splatVertexIDs[2];
						let splatFace = new MeshFace(splattedMesh,{vertices: [firstVertexID,secondVertexID,thirdVertexID], uv:{[firstVertexID]:[0,Project.texture_height],[secondVertexID]:[Project.texture_width,Project.texture_height],[thirdVertexID]:[Project.texture_width * 0.5,0]}});
						splattedMesh.addFaces(splatFace);
					}
					splattedMesh.init();
					createdMeshes.push();
					splattedMesh.select();
				});
                Canvas.updateAll();
                Undo.finishEdit('Create splat instance mesh');
            }
        });
        MenuBar.addAction(meshToSplatMeshButton, 'filter');
    },
    onunload() {
        meshToSplatMeshButton.delete();
    }
});
