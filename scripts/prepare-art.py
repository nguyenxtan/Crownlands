"""Normalize authorized prototype copies; never modifies source or approved export folders.
Requires Pillow; runtime/build have no Python dependency.
"""
import hashlib,json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'app/assets';OUT.mkdir(parents=True,exist_ok=True)
entries=[]
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def sprite(source,name,size,anchor,maxbox,revision='proof-v01.png'):
    p=ROOT/'assets/source'/source/revision
    im=Image.open(p).convert('RGBA');bbox=im.getchannel('A').point(lambda a:255 if a>16 else 0).getbbox()
    crop=im.crop(bbox);crop.thumbnail(maxbox,Image.Resampling.LANCZOS)
    canvas=Image.new('RGBA',size);canvas.alpha_composite(crop,(round(size[0]*.5-crop.width/2),round(size[1]*anchor-crop.height)))
    target=OUT/f'{name}.png';canvas.save(target,optimize=True)
    entries.append(dict(source=str(p.relative_to(ROOT)),output=str(target.relative_to(ROOT)),source_sha256=digest(p),output_sha256=digest(target),size=size,ground_anchor=[.5,anchor],status='provisional-runtime-copy'))
for folder,name in [('world-city-small','world-city'),('world-npc-bandit-camp','world-bandits'),('world-resource-clay-site','world-clay'),('world-resource-grain-field','world-grain'),('world-army-patrol','world-patrol')]:
    sprite(folder,name,(128,128),.75,(112,86))
for folder,name,revision in [
    ('city-town-hall-v01','city-hall','proof-v02.png'),
    ('city-barracks-v01','city-barracks','proof-v01.png'),
    ('city-warehouse-v01','city-warehouse','proof-v01.png'),
    ('city-granary-v01','city-granary','proof-v01.png'),
    ('city-rally-point-v01','city-rally-point','proof-v01.png'),
    ('city-transport-depot-v01','city-transport-depot','proof-v02.png'),
]:
    sprite(folder,name,(512,512),.78,(430,358),revision)
for resource in ['wood','clay','iron','grain']:
    sprite(f'city-resource-{resource}-v01',f'city-resource-{resource}',(512,512),.78,(430,358))
for name in ['city-wall-v01','city-gate-v01']:
    p=ROOT/'assets/source'/name/'proof-v01.png';target=OUT/f'{name}.png';target.write_bytes(p.read_bytes())
    with Image.open(p) as im:size=im.size
    entries.append(dict(source=str(p.relative_to(ROOT)),output=str(target.relative_to(ROOT)),source_sha256=digest(p),output_sha256=digest(target),size=size,status='provisional-runtime-copy'))
for folder,name,size,revision in [('world-terrain-grass-summer','grass',(256,256),'proof-v01.png'),('city-ground-summer','city-ground',(1448,1086),'proof-v01.png'),('city-ground-summer','city-ground-v02',(1448,1086),'proof-v02.png')]:
    p=ROOT/'assets/source'/folder/revision;im=Image.open(p).convert('RGB');im=im.resize(size,Image.Resampling.LANCZOS);target=OUT/f'{name}.webp';im.save(target,quality=88)
    entries.append(dict(source=str(p.relative_to(ROOT)),output=str(target.relative_to(ROOT)),source_sha256=digest(p),output_sha256=digest(target),size=size,status='provisional-runtime-copy'))
p=ROOT/'assets/export/ui/ui-resource-grain.svg';target=OUT/'grain.svg';target.write_bytes(p.read_bytes());entries.append(dict(source=str(p.relative_to(ROOT)),output=str(target.relative_to(ROOT)),source_sha256=digest(p),output_sha256=digest(target),status='approved-v2-unchanged'))
(OUT/'provenance.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(entries)} local images; originals unchanged')
