import numpy as np
import operator
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于生成样本的属性特征以及对应的标签
    Parameters:
        file_name: 样本数据所在的文件名称
    Return:
        x_data：属性特征
        y_label：标签
"""
def establish_data(file_name):
    f = open(file_name)
    line_datas = f.readlines(); data_number = len(line_datas)
    x_data, y_label = list(), list()
    for line_data in line_datas:
        line_data_list = line_data.split("\t")
        x_data.append(line_data_list[:-1])
        y_label.append(line_data_list[-1].strip())
    return np.array(x_data, dtype = np.float32), np.array(y_label, dtype = np.float32)
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: KNN的核心分类方法
    Parameters:
        in_data: 目标分类样本
        x_data: 已知标签的样本属性特征
        y_label：样本标签
        k：K-近邻当中的k，也就是自定义的超参数
    Return:
        result: 最终的分类结果
"""
def knn_classification(in_data, x_data, y_label, k):
    data_number, _ = x_data.shape
    distance = np.sqrt(np.power((np.tile(in_data, [data_number, 1]) - x_data), 2).sum(axis=1))
    distance = distance.argsort()
    class_count = dict()
    for index in range(k):
        label = y_label[distance[index]]
        class_count[label] = class_count.get(label, 0) + 1
    sorted_class_count = sorted(class_count.items(), key=operator.itemgetter(1), reverse=True)
    return sorted_class_count[0][0]
from matplotlib import pyplot as plt
from matplotlib.font_manager import FontProperties
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 数据可视化
"""
def show_result(x_data, y_label, axis, scatter_index):
    plt.subplot(2, 2, scatter_index)
    plt.scatter(x_data[:, axis[0]], x_data[:, axis[1]], c = y_label)
    font = FontProperties(fname=r"c:\windows\fonts\simsun.ttc", size=14)
    label_list = ["每年获得的飞行常客里程数", "玩视频游戏所耗时间百分比", "每周所消耗的冰淇淋公升数"]
    plt.xlabel(label_list[axis[0]], FontProperties = font); plt.ylabel(label_list[axis[1]], FontProperties = font)
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 数据归一化
"""
def normalize_data(x_data, y_data):
    data_number, _ = x_data.shape
    min_data, max_data = np.tile(x_data.min(axis = 0), [data_number, 1]), np.tile(x_data.max(axis = 0), [data_number, 1])
    new_x_data = (x_data - min_data) / (max_data - min_data)
    return new_x_data, y_label
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 对数据进行预测并输出相关错误信息
"""
def calc_error_info(x_data, y_data, info_text):
    error_count = 0
    for index in range(x_data.shape[0]):
        predict_result = knn_classification(x_data[index], x_data, y_label, 20)
        if (int(predict_result) != y_label[index]): error_count += 1
    print("%s预测错误的个数为：%d，错误率为：%f" % (info_text, error_count, error_count / 1000))
if __name__ == "__main__":
    x_data, y_label = establish_data("./datingTestSet2.txt")
    norm_x_data, norm_y_label = normalize_data(x_data, y_label)
    calc_error_info(x_data, y_label, "归一化数据之前：")
    calc_error_info(norm_x_data, norm_y_label, "归一化数据之后：")