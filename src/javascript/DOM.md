# input同时调起相机和相册
做了一个h5的项目，记录一下我踩过的坑
```html
<input type="file" class="input">
```
直接这样写就可以调起系统目录，因为并没有对它限定文件类型，所以此时的状态是既可以选择图片也可以选择文档。 产品要求对图片的格式进行限定，只支持jpg和png格式的图片

```html
<input type="file" class="input" accept="image/png,image/jpeg">

```
这时候问题来了，还是只能调起相册，无法调起相机，于是我又加上了capture属性
```html
<input type="file" class="input" accept="image/jpg, image/jpeg" capture="camera">
```
此时可以成功调起相机，但是也只能调起相机

于是在无意间发现了终极方案
```html
<input type="file" class="input" accept="image/*">
```
成功调起了相机和相册，所以关键点是：accept属性必须用“image/*”！！！对于图片格式，可以在change事件中进行判断。 我看到几乎所有的博客都提到了需要给安卓机配上capture才能调起相机，但是我试验的几台机子不需要加这个属性，如果加了就会直接调起相机。
