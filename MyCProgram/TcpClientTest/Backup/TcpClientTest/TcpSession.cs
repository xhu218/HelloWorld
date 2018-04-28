using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Threading;
using System.Diagnostics;

namespace TcpClientTest
{
    public class TCPSessionDealer
    {
        private TcpClient tcpClient;
        private NetworkStream ns;
        private Queue<String> queue;
        private object locker;
        private AutoResetEvent autoResetEvent;
        private TcpStatus tcpStatus;

        private String msv555IP;
        private int msv555Port;

        public TCPSessionDealer(String msv555IP, int msv555Port)
        {
            try
            {
                this.msv555IP = msv555IP;
                this.msv555Port = msv555Port;

                autoResetEvent = new AutoResetEvent(true);
                locker = new object();
                queue = new Queue<String>();

                InitTcpSession();

                System.Threading.Thread thread = new System.Threading.Thread(SendTcpMosMessage);
                thread.IsBackground = true;
                thread.Start();

            }
            catch (Exception ex)
            {
                //NMLog.WriteError(ErrorCode.Unknown, ex.ToString());
                Trace.TraceError(ex.ToString());
            }
        }

        private void SendTcpMosMessage(object o)
        {
            while (true)
            {
                try
                {
                    if (queue.Count > 0)
                    {
                        if (tcpClient != null && tcpClient.Connected)
                        {
                            //只是取第一个元素并不移出
                            String message = queue.Peek();

                            string xml = message;
                            byte[] data = System.Text.Encoding.Unicode.GetBytes(xml);
                            Trace.TraceInformation(string.Format("queue count remains:{0} send to msv555IP:{1}- msv555Port:{2}\r\n{3}", queue.Count, this.msv555IP, this.msv555Port, xml));
                            if(ns.CanWrite)
                            ns.Write(data, 0, data.Length);
                            

                            //真正发送成功再移出
                            queue.Dequeue();
                            Trace.TraceInformation(" i have remove from the queue.....");

                            System.Threading.Thread.Sleep(5);
                        }
                        else
                        {
                            InitTcpSession();
                        }
                    }
                    else
                    {
                        autoResetEvent.WaitOne(5000);
                    }
                }
                catch (Exception ex)
                {
                    //NMLog.WriteError(ErrorCode.Unknown, ex.ToString());
                    Trace.TraceError(ex.ToString());
                    InitTcpSession();
                }
            }
        }

        private void InitTcpSession()
        {
            try
            {
                Trace.TraceInformation("start...");

                tcpClient = new TcpClient();

                if (!string.IsNullOrEmpty(this.msv555IP))
                {
                    //NMLog.WriteDebug(string.Format("connect to {0}:{1}", this.msv555IP, this.msv555Port));
                    Trace.TraceInformation(string.Format("connect to {0}:{1}", this.msv555IP, this.msv555Port));
                    tcpClient.Connect(this.msv555IP, this.msv555Port);
                    tcpStatus = TcpStatus.Connected;
                    ns = tcpClient.GetStream();
                }
                else
                {
                    tcpStatus = TcpStatus.NotDefineIP;
                    //NMLog.WriteError(ErrorCode.Unknown, "not define 555 ip address");

                }
            }
            catch (Exception ex)
            {
                tcpStatus = TcpStatus.ServerOffline;
                //NMLog.WriteError(ErrorCode.Unknown, ex.ToString());
                Trace.TraceError(ex.ToString());
            }
            finally
            {
                //NMLog.WriteDebug(string.Format("queue count {0}", queue.Count));

            }
        }

        public bool SendMosMessage(String mosMessage)
        {
            lock (locker)
            {
                if (tcpStatus != TcpStatus.NotDefineIP)
                {
                    queue.Enqueue(mosMessage);
                    autoResetEvent.Set();
                }
                return true;
            }
        }
    }
    public enum TcpStatus
    {
        NotDefineIP = 0,
        NotDefinePort = 1,
        ServerOffline = 2,
        InternalException = 3,
        Connected = 4
    }
}
