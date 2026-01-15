#!/bin/bash

set -e

echo "开始部署Web应用..."

# 配置
DIST_DIR="./build"
TARGET_DIR="/home/www/web/calendar-picker-with-select"

# 构建项目
echo "执行 yarn build..."
yarn build

# 检查构建结果
if [ ! -d "$DIST_DIR" ]; then
    echo "错误: dist目录未生成，构建可能失败"
    exit 1
fi

# 创建目标目录
echo "创建目标目录..."
sudo mkdir -p "$TARGET_DIR"
sudo chown -R $USER:$USER "$(dirname "$TARGET_DIR")"

# 部署文件
echo "部署文件到 $TARGET_DIR..."
cp -r "$DIST_DIR"/* "$TARGET_DIR"/

echo "部署完成！"
