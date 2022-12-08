#!/usr/bin/env python
# coding=utf-8
import json
import time
import traceback

from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.acs_exception.exceptions import ClientException, ServerException
from aliyunsdkecs.request.v20140526.RunInstancesRequest import RunInstancesRequest
from aliyunsdkecs.request.v20140526.DescribeInstancesRequest import DescribeInstancesRequest


RUNNING_STATUS = 'Running'
CHECK_INTERVAL = 3
CHECK_TIMEOUT = 180


class AliyunRunInstancesExample(object):

    def __init__(self):
        self.access_id = '<AccessKey>'
        self.access_secret = '<AccessSecret>'

        # 是否只预检此次请求。true：发送检查请求，不会创建实例，也不会产生费用；false：发送正常请求，通过检查后直接创建实例，并直接产生费用
        self.dry_run = False
        # 实例所属的地域ID
        self.region_id = 'cn-beijing'
        # 实例的资源规格
        self.instance_type = 'ecs.t5-lc2m1.nano'
        # 实例的计费方式
        self.instance_charge_type = 'PostPaid'
        # 镜像ID
        self.image_id = 'centos_8_4_x64_20G_alibase_20210824.vhd'
        # 指定新创建实例所属于的安全组ID
        self.security_group_id = 'sg-2ze9ng9hibpq1y4dgw3l'
        # 购买资源的时长
        self.period = 1
        # 购买资源的时长单位
        self.period_unit = 'Hourly'
        # 实例所属的可用区编号
        self.zone_id = 'random'
        # 网络计费类型
        self.internet_charge_type = 'PayByTraffic'
        # 虚拟交换机ID
        self.vswitch_id = 'vsw-2zeemqu1aulvgb9m8g8l8'
        # 实例名称
        self.instance_name = 'launch-advisor-20210930'
        # 指定创建ECS实例的数量
        self.amount = 1
        # 公网出带宽最大值
        self.internet_max_bandwidth_out = 100
        # 是否为I/O优化实例
        self.io_optimized = 'optimized'
        # 实例自定义数据
        self.user_data = 'IyEvYmluL2Jhc2gKCiMgQ29weXJpZ2h0IDIwMjAtMjAyMSBBbGliYWJhIEdyb3VwIEhvbGRpbmcgTGltaXRlZAoKIyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeQojIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5CiMgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IKIyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLgoKIyBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwKIyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZgojIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGUKIyBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLgoKIyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZQojIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi4KCm1vdW50X3RhcmdldHM9KAogICAgMWYyZGQ0OWZlMi10dWkzMS5jbi1iZWlqaW5nLm5hcy5hbGl5dW5jcy5jb20KKQptb3VudF9wb2ludHM9KAogICAgL3NoYXJlZGlzawopCnVzZV92Mz0oCiAgICAwCikKCnN1Y2Nlc3NfaW5zdGFsbF9jbGllbnQ9MAoKdHlwZSB5dW0KaWYgWyAkPyAtZXEgMCAtYSAkc3VjY2Vzc19pbnN0YWxsX2NsaWVudCAtZXEgMCBdOyB0aGVuCiAgICB5dW0gaW5zdGFsbCAteSBuZnMtdXRpbHMKICAgIGlmIFsgJD8gLWVxIDAgXTsgdGhlbgogICAgICAgIHN1Y2Nlc3NfaW5zdGFsbF9jbGllbnQ9MQogICAgZmkKZmkKCnR5cGUgYXB0LWdldAppZiBbICQ/IC1lcSAwIC1hICRzdWNjZXNzX2luc3RhbGxfY2xpZW50IC1lcSAwIF07IHRoZW4KICAgIGFwdC1nZXQgaW5zdGFsbCAteSBuZnMtY29tbW9uCiAgICBpZiBbICQ/IC1lcSAwIF07IHRoZW4KICAgICAgICBzdWNjZXNzX2luc3RhbGxfY2xpZW50PTEKICAgIGVsc2UKICAgICAgICBhcHQtZ2V0IHVwZGF0ZQogICAgICAgIGFwdC1nZXQgaW5zdGFsbCAteSBuZnMtY29tbW9uCiAgICAgICAgaWYgWyAkPyAtZXEgMCBdOyB0aGVuCiAgICAgICAgICAgIHN1Y2Nlc3NfaW5zdGFsbF9jbGllbnQ9MQogICAgICAgIGZpCiAgICBmaQpmaQoKdHlwZSB6eXBwZXIKaWYgWyAkPyAtZXEgMCAtYSAkc3VjY2Vzc19pbnN0YWxsX2NsaWVudCAtZXEgMCBdOyB0aGVuCiAgICB6eXBwZXIgaW5zdGFsbCAteSBuZnMtY2xpZW50CiAgICBpZiBbICQ/IC1lcSAwIF07IHRoZW4KICAgICAgICBzdWNjZXNzX2luc3RhbGxfY2xpZW50PTEKICAgIGVsc2UKICAgICAgICB6eXBwZXIgcmVmcmVzaAogICAgICAgIHp5cHBlciBpbnN0YWxsIC15IG5mcy1jbGllbnQKICAgICAgICBpZiBbICQ/IC1lcSAwIF07IHRoZW4KICAgICAgICAgICAgc3VjY2Vzc19pbnN0YWxsX2NsaWVudD0xCiAgICAgICAgZmkKICAgIGZpCmZpCgppZiBbICRzdWNjZXNzX2luc3RhbGxfY2xpZW50IC1uZSAxIF07IHRoZW4KICAgIGV4aXQgMApmaQoKaWYgKGxzbW9kIHwgZ3JlcCBzdW5ycGMgPiAvZGV2L251bGwpOyB0aGVuCiAgICBpZiAobW9kaW5mbyBzdW5ycGMgfCBncmVwIHRjcF9tYXhfc2xvdF90YWJsZV9lbnRyaWVzID4gL2Rldi9udWxsKTsgdGhlbgogICAgICAgIHN5c2N0bCAtdyBzdW5ycGMudGNwX21heF9zbG90X3RhYmxlX2VudHJpZXM9MTI4CiAgICBmaQogICAgaWYgKG1vZGluZm8gc3VucnBjIHwgZ3JlcCB0Y3Bfc2xvdF90YWJsZV9lbnRyaWVzID4gL2Rldi9udWxsKTsgdGhlbgogICAgICAgIHN5c2N0bCAtdyBzdW5ycGMudGNwX3Nsb3RfdGFibGVfZW50cmllcz0xMjgKICAgIGZpCmZpCgppZiAobW9kaW5mbyBuZnMgfCBncmVwIG5mczRfdW5pcXVlX2lkID4gL2Rldi9udWxsKTsgdGhlbgogICAgcHJpbnRmICdpbnN0YWxsIG5mcyAvc2Jpbi9tb2Rwcm9iZSAtLWlnbm9yZS1pbnN0YWxsIG5mcyBuZnM0X3VuaXF1ZV9pZD0kKGNhdCAvc3lzL2NsYXNzL2RtaS9pZC9wcm9kdWN0X3V1aWQpXG4nID4gL2V0Yy9tb2Rwcm9iZS5kL2FsaW5hcy5jb25mCmZpCihtb2RpbmZvIHN1bnJwYyB8IGdyZXAgdGNwX21heF9zbG90X3RhYmxlX2VudHJpZXMgPiAvZGV2L251bGwpICYmIGVjaG8gIm9wdGlvbnMgc3VucnBjIHRjcF9tYXhfc2xvdF90YWJsZV9lbnRyaWVzPTEyOCIgPj4gL2V0Yy9tb2Rwcm9iZS5kL2FsaW5hcy5jb25mCihtb2RpbmZvIHN1bnJwYyB8IGdyZXAgdGNwX3Nsb3RfdGFibGVfZW50cmllcyA+IC9kZXYvbnVsbCkgJiYgZWNobyAib3B0aW9ucyBzdW5ycGMgdGNwX3Nsb3RfdGFibGVfZW50cmllcz0xMjgiID4+IC9ldGMvbW9kcHJvYmUuZC9hbGluYXMuY29uZgoKaWYgWyAhIC1mIC9ldGMvcmMubG9jYWwgXTsgdGhlbgogICAgZWNobyAnIyEvYmluL2Jhc2gnID4gL2V0Yy9yYy5sb2NhbApmaQplY2hvICJtb3VudCAtYSAtdCBuZnMiID4+IC9ldGMvcmMubG9jYWwKY2htb2QgK3ggL2V0Yy9yYy5sb2NhbAoKZm9yIGkgaW4gIiR7IW1vdW50X3RhcmdldHNbQF19IjsgZG8KICAgIG1vdW50X3RhcmdldD0ke21vdW50X3RhcmdldHNbJGldfQogICAgWyAteiAkbW91bnRfdGFyZ2V0IF0gJiYgY29udGludWUKICAgIG1vdW50X3BvaW50PSR7bW91bnRfcG9pbnRzWyRpXX0KICAgIFsgLXogJG1vdW50X3BvaW50IF0gJiYgY29udGludWUKICAgIHYzPSR7dXNlX3YzWyRpXX0KICAgIFsgLXogJHYzIF0gJiYgY29udGludWUKCiAgICBta2RpciAtcCAiJHttb3VudF9wb2ludH0iIHx8IGNvbnRpbnVlCgogICAgYXV0b21vdW50X3BhcmFtPSIiCiAgICBpZiBbIC1mIC9ldGMvb3MtcmVsZWFzZSBdOyB0aGVuCiAgICAgICAgb3NfbmFtZT1gYXdrIC1GPSAnL15OQU1FL3twcmludCAkMn0nIC9ldGMvb3MtcmVsZWFzZWAKICAgICAgICBpZiBbWyAke29zX25hbWV9ID09ICJcIlVidW50dVwiIiBdXTsgdGhlbgogICAgICAgICAgICBpZiAobWFuIHN5c3RlbWQtZnN0YWItZ2VuZXJhdG9yID4gL2Rldi9udWxsKTsgdGhlbgogICAgICAgICAgICAgICAgYXV0b21vdW50X3BhcmFtPSIseC1zeXN0ZW1kLmF1dG9tb3VudCIKICAgICAgICAgICAgZmkKICAgICAgICBlbGlmIFtbICR7b3NfbmFtZX0gPT0gIlwiQWxpeXVuIExpbnV4XCIiIF1dOyB0aGVuCiAgICAgICAgICAgIGlmIChtYW4gc3lzdGVtZC1mc3RhYi1nZW5lcmF0b3IgPiAvZGV2L251bGwpOyB0aGVuCiAgICAgICAgICAgICAgICBhdXRvbW91bnRfcGFyYW09Iix4LXN5c3RlbWQuYXV0b21vdW50LHgtc3lzdGVtZC5yZXF1aXJlcz1zeXN0ZW1kLXJlc29sdmVkLnNlcnZpY2UseC1zeXN0ZW1kLmFmdGVyPXN5c3RlbWQtcmVzb2x2ZWQuc2VydmljZSIKICAgICAgICAgICAgZmkKICAgICAgICBmaQogICAgZmkKCiAgICBpZiBbWyAkbW91bnRfdGFyZ2V0ID09ICouZXh0cmVtZS5uYXMuYWxpeXVuY3MuY29tIF1dOyB0aGVuCiAgICAgICAgaWYgWyAtZiAvZXRjL3N5c3RlbWQvc3lzdGVtL3NvY2tldHMudGFyZ2V0LndhbnRzL3JwY2JpbmQuc29ja2V0IF07IHRoZW4KICAgICAgICAgICAgc2VkIC1pICdzL0JpbmRJUHY2T25seT1pcHY2LW9ubHkvI0JpbmRJUHY2T25seT1pcHY2LW9ubHkvZycgL2V0Yy9zeXN0ZW1kL3N5c3RlbS9zb2NrZXRzLnRhcmdldC53YW50cy9ycGNiaW5kLnNvY2tldAogICAgICAgICAgICBzZWQgLWkgJ3MvTGlzdGVuU3RyZWFtPVxbOjpcXToxMTEvI0xpc3RlblN0cmVhbT1cWzo6XF06MTExL2cnIC9ldGMvc3lzdGVtZC9zeXN0ZW0vc29ja2V0cy50YXJnZXQud2FudHMvcnBjYmluZC5zb2NrZXQKICAgICAgICAgICAgc2VkIC1pICdzL0xpc3RlbkRhdGFncmFtPVxbOjpcXToxMTEvI0xpc3RlbkRhdGFncmFtPVxbOjpcXToxMTEvZycgL2V0Yy9zeXN0ZW1kL3N5c3RlbS9zb2NrZXRzLnRhcmdldC53YW50cy9ycGNiaW5kLnNvY2tldAogICAgICAgIGZpCiAgICAgICAgZWNobyAiJHttb3VudF90YXJnZXR9Oi9zaGFyZSAke21vdW50X3BvaW50fSBuZnMgdmVycz0zLG5vbG9jayxub2FjbCxwcm90bz10Y3Asbm9yZXN2cG9ydCxfbmV0ZGV2JHthdXRvbW91bnRfcGFyYW19IDAgMCIgPj4gL2V0Yy9mc3RhYgogICAgZWxpZiBbWyAkbW91bnRfdGFyZ2V0ID09ICoubmFzLmFsaXl1bmNzLmNvbSBdXTsgdGhlbgogICAgICAgIGlmIFsgJHYzIC1lcSAxIF07IHRoZW4KICAgICAgICAgICAgZWNobyAiJHttb3VudF90YXJnZXR9Oi8gJHttb3VudF9wb2ludH0gbmZzIHZlcnM9Myxub2xvY2sscHJvdG89dGNwLHJzaXplPTEwNDg1NzYsd3NpemU9MTA0ODU3NixoYXJkLHRpbWVvPTYwMCxyZXRyYW5zPTIsX25ldGRldixub3Jlc3Zwb3J0JHthdXRvbW91bnRfcGFyYW19IDAgMCIgPj4gL2V0Yy9mc3RhYgogICAgICAgIGVsc2UKICAgICAgICAgICAgZWNobyAiJHttb3VudF90YXJnZXR9Oi8gJHttb3VudF9wb2ludH0gbmZzIHZlcnM9NCxtaW5vcnZlcnNpb249MCxyc2l6ZT0xMDQ4NTc2LHdzaXplPTEwNDg1NzYsaGFyZCx0aW1lbz02MDAscmV0cmFucz0yLF9uZXRkZXYsbm9yZXN2cG9ydCR7YXV0b21vdW50X3BhcmFtfSAwIDAiID4+IC9ldGMvZnN0YWIKICAgICAgICBmaQogICAgZmkKCiAgICBtb3VudCAtYSAtdCBuZnMKZG9uZQoK'
        # 密钥对名称
        self.key_pair_name = 'aliyun-bj'
        # 后付费实例的抢占策略
        self.spot_strategy = 'SpotWithPriceLimit'
        # 设置实例的每小时最高价格
        self.spot_price_limit = 0.063
        # 是否开启安全加固
        self.security_enhancement_strategy = 'Active'
        # 系统盘大小
        self.system_disk_size = '20'
        # 系统盘的磁盘种类
        self.system_disk_category = 'cloud_efficiency'
        
        self.client = AcsClient(self.access_id, self.access_secret, self.region_id)

    def run(self):
        try:
            ids = self.run_instances()
            self._check_instances_status(ids)
        except ClientException as e:
            print('Fail. Something with your connection with Aliyun go incorrect.'
                  ' Code: {code}, Message: {msg}'
                  .format(code=e.error_code, msg=e.message))
        except ServerException as e:
            print('Fail. Business error.'
                  ' Code: {code}, Message: {msg}'
                  .format(code=e.error_code, msg=e.message))
        except Exception:
            print('Unhandled error')
            print(traceback.format_exc())

    def run_instances(self):
        """
        调用创建实例的API，得到实例ID后继续查询实例状态
        :return:instance_ids 需要检查的实例ID
        """
        request = RunInstancesRequest()
       
        request.set_DryRun(self.dry_run)
        
        request.set_InstanceType(self.instance_type)
        request.set_InstanceChargeType(self.instance_charge_type)
        request.set_ImageId(self.image_id)
        request.set_SecurityGroupId(self.security_group_id)
        request.set_Period(self.period)
        request.set_PeriodUnit(self.period_unit)
        request.set_ZoneId(self.zone_id)
        request.set_InternetChargeType(self.internet_charge_type)
        request.set_VSwitchId(self.vswitch_id)
        request.set_InstanceName(self.instance_name)
        request.set_Amount(self.amount)
        request.set_InternetMaxBandwidthOut(self.internet_max_bandwidth_out)
        request.set_IoOptimized(self.io_optimized)
        request.set_UserData(self.user_data)
        request.set_KeyPairName(self.key_pair_name)
        request.set_SpotStrategy(self.spot_strategy)
        request.set_SpotPriceLimit(self.spot_price_limit)
        request.set_SecurityEnhancementStrategy(self.security_enhancement_strategy)
        request.set_SystemDiskSize(self.system_disk_size)
        request.set_SystemDiskCategory(self.system_disk_category)
         
        body = self.client.do_action_with_exception(request)
        data = json.loads(body)
        instance_ids = data['InstanceIdSets']['InstanceIdSet']
        print('Success. Instance creation succeed. InstanceIds: {}'.format(', '.join(instance_ids)))
        return instance_ids

    def _check_instances_status(self, instance_ids):
        """
        每3秒中检查一次实例的状态，超时时间设为3分钟。
        :param instance_ids 需要检查的实例ID
        :return:
        """
        start = time.time()
        while True:
            request = DescribeInstancesRequest()
            request.set_InstanceIds(json.dumps(instance_ids))
            body = self.client.do_action_with_exception(request)
            data = json.loads(body)
            for instance in data['Instances']['Instance']:
                if RUNNING_STATUS in instance['Status']:
                    instance_ids.remove(instance['InstanceId'])
                    print('Instance boot successfully: {}'.format(instance['InstanceId']))

            if not instance_ids:
                print('Instances all boot successfully')
                break

            if time.time() - start > CHECK_TIMEOUT:
                print('Instances boot failed within {timeout}s: {ids}'
                      .format(timeout=CHECK_TIMEOUT, ids=', '.join(instance_ids)))
                break

            time.sleep(CHECK_INTERVAL)


if __name__ == '__main__':
    AliyunRunInstancesExample().run()