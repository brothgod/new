import os
import json
import difflib
from pathlib import Path

def find_matching_image(json_data, image_folder):
    for obj in json_data:
        full_name = obj['full_name']
        image_name = find_image_name(full_name, image_folder)
        if image_name:
            # Update image path to standardized path
            standardized_image_name = os.path.join(image_folder, f"{full_name.replace(' ', '_')}_main.png")
            if not standardized_image_name is image_name:
                os.rename(image_name, standardized_image_name)
                obj['image_path'] = standardized_image_name
    return json_data

def find_image_name(full_name, image_folder):
    # image_files = os.listdir(image_folder)
    # matches = difflib.get_close_matches(full_name, image_files)
    # if matches:
    #     return os.path.join(image_folder, matches[0])  # Return first match
    for filename in os.listdir(image_folder):
        if full_name.lower() in str(filename).lower():
            return os.path.join(image_folder, filename)

    print(full_name)
    return None

def update_json_file(json_file, updated_data):
    with open(json_file, 'w') as f:
        json.dump(updated_data, f, indent=4)

def main():
    json_file = 'student-info.json'
    image_folder = 'main-images'

    # Load JSON data
    with open(json_file, 'r', encoding='utf-8') as f:
        json_data = json.load(f)

    # Find matching images and update JSON data
    updated_data = find_matching_image(json_data, image_folder)

    # Update JSON file
    update_json_file(json_file, updated_data)

if __name__ == "__main__":
    main()
