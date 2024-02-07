import numpy as np
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于生成样本的属性特征以及对应的标签
    Return:
        x_data: 数据样本的属性，其中包括8个属性
        y_label: 样本属性所对应的标签
"""
def establish_data():
    x_data = [[1, 1, 1, 1, 1, 1, 0.697, 0.460],
             [2, 1, 2, 1, 1, 1, 0.774, 0.376],
             [2, 1, 1, 1, 1, 1, 0.634, 0.264],
             [1, 1, 2, 1, 1, 1, 0.608, 0.318],
             [3, 1, 1, 1, 1, 1, 0.556, 0.215],
             [1, 2, 1, 1, 2, 2, 0.403, 0.237],
             [2, 2, 1, 2, 2, 2, 0.481, 0.149],
             [2, 2, 1, 1, 2, 1, 0.437, 0.211],
             [2, 2, 2, 2, 2, 1, 0.666, 0.091],
             [1, 3, 3, 1, 3, 2, 0.243, 0.267],
             [3, 3, 3, 3, 3, 1, 0.245, 0.057],
             [3, 1, 1, 3, 3, 2, 0.343, 0.099],
             [1, 2, 1, 2, 1, 1, 0.639, 0.161],
             [3, 2, 2, 2, 1, 1, 0.657, 0.198],
             [2, 2, 1, 1, 2, 2, 0.360, 0.370],
             [3, 1, 1, 3, 3, 1, 0.593, 0.042],
             [1, 1, 2, 2, 2, 1, 0.719, 0.103]]
    y_label = [0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 1, 1, 1, 1, 1]
    return np.array(x_data), np.array(y_label)
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于统计不同标签的样本数量
    Parameters:
        y_label: 样本属性所对应的标签
    Return:
        label_count: 不同样本标签的数量
"""
def calc_label_count(y_label):
    label_count_0, label_count_1 = 0, 0; data_number = y_label.shape[0]
    for label in y_label:    # 遍历y_label，统计不同类别的数量
        if int(label) == 0: label_count_0 += 1
        if int(label) == 1: label_count_1 += 1
    return label_count_0, label_count_1
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于计算各类别在数据样本集中的频率，即各类别的$P(c)$值：
    Parameters:
        y_label: 样本属性所对应的标签
    Return:
        pc: 指定对应标签的频率值
"""
def calc_p_c(y_label):
    data_number = y_label.shape[0]
    label_count_0, label_count_1 = calc_label_count(y_label)
    return label_count_0 / data_number, label_count_1 / data_number
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于计算各类别在数据样本集中的频率，即各类别的$P(c)$值，主要用于标称型数据
    Parameters:
        y_label: 样本属性所对应的标签
    Return:
        pc: 指定对应标签的频率值
"""
def calc_dispersed_p_xi_c(test_data, x_data, y_label, attribute_index):
    label_count_0, label_count_1  = calc_label_count(y_label)
    attribute_count_0, attribute_count_1 = 0, 0
    for item in x_data[:label_count_0]:
        if test_data[attribute_index] == item[attribute_index]:
            attribute_count_0 += 1
    for item in x_data[label_count_0:]:
        if test_data[attribute_index] == item[attribute_index]:
            attribute_count_1 += 1
    return attribute_count_0 / label_count_0, attribute_count_1 / label_count_1
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 用于计算均值和标准差
"""
def calc_mean_standard(x_data):
    mean_value_0, mean_value_1 = np.mean(x_data[:8, 6:8], axis = 0), np.mean(x_data[8:, 6:8], axis = 0)
    std_value_0, std_value_1 = np.std(x_data[:8, 6:8], axis = 0), np.std(x_data[8:, 6:8], axis = 0)
    return mean_value_0, mean_value_1, std_value_0, std_value_1
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 将数据进行高斯转化
"""
def calc_gaussian(data, mean_value, std_value):
    return (1 / (np.sqrt(2*np.pi) * std_value)) * (np.e ** ((- (data - mean_value) ** 2) / (2 * (std_value) ** 2)))
"""
    Author: Taoye
    微信公众号: 玩世不恭的Coder
    Explain: 计算数值型数据的p_xi_c
"""
def calc_continuity_p_xi_c(test_data, x_data):
    mean_value_0, mean_value_1, std_value_0, std_value_1 = calc_mean_standard(x_data)  
    pxi_density_0 = calc_gaussian(test_data[6], mean_value_0[0], std_value_0[0])
    pxi_density_1 = calc_gaussian(test_data[6], mean_value_1[0], std_value_1[0])
    pxi_sugar_0 = calc_gaussian(test_data[7], mean_value_0[1], std_value_0[1])
    pxi_sugar_1 = calc_gaussian(test_data[7], mean_value_1[1], std_value_1[1])
    return pxi_density_0, pxi_density_1, pxi_sugar_0, pxi_sugar_1
if __name__ == "__main__":
    test_data = [1, 1, 1, 1, 1, 1, 0.697, 0.460]
    x_data, y_label = establish_data()
    attr0 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 0)
    attr1 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 1)
    attr2 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 2)
    attr3 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 3)
    attr4 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 4)
    attr5 = calc_dispersed_p_xi_c(test_data, x_data, y_label, 5)
    print("标称型数据的P_{(x_i,c)}：", attr0, attr1, attr2, attr3, attr4, attr5)
    pxi_density_0, pxi_density_1, pxi_sugar_0, pxi_sugar_1 = calc_continuity_p_xi_c(test_data, x_data)
    print("数值型数据的P_{(x_i,c)}：", pxi_density_0, pxi_density_1, pxi_sugar_0, pxi_sugar_1)
    p1, p2 = calc_p_c(y_label)
    print("数据样集中的各类别的概率情况分别为：", p1, p2)
    p_good_melon = p1 * attr0[0] * attr1[0] * attr2[0] * attr3[0] * attr4[0] * attr5[0] * pxi_density_0 * pxi_sugar_0
    p_bad_melon = p2 * attr0[1] * attr1[1] * attr2[1] * attr3[1] * attr4[1] * attr5[1] * pxi_density_1 * pxi_sugar_1
    print("分类为好瓜和坏瓜的可能性分别为：", p_good_melon, p_bad_melon)
    print("恰瓜群众拿到这个是好瓜") if p_good_melon >= p_bad_melon else print("恰瓜群众拿到这个是好瓜")