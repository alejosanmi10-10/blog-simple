import os

dir_path = 'frontend/src'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(('.css', '.vue')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            if file == 'Header.vue':
                content = content.replace('background-color: #ffff00;', 'background-color: #DC143C;')
                content = content.replace('background-color: #00ffff;', 'background-color: #FFFFFF;')
                content = content.replace('background-color: #E5E5E5;', 'background-color: #E5E5E5;')
            else:
                # Replace eye-burning colors with sleek red/white theme
                content = content.replace('#ffff00', '#FFFFFF')
                content = content.replace('#00ffff', '#FFFFFF')
                content = content.replace('#ff00ff', '#DC143C')
                
                # PrincipalPage button hovers and stuff
                content = content.replace('#ff4dff', '#E5E5E5')

            with open(filepath, 'w') as f:
                f.write(content)

print("Colors updated")
