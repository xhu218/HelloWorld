using System;
using System.Runtime.InteropServices;  
using System.Security.Principal; 
using System.Security.Permissions;

namespace ConsoleApplication2
{
	/// <summary>
	/// Impersonation 的摘要说明。
	/// </summary>

	public class Impersonation
	{
		const int LOGON32_PROVIDER_DEFAULT = 0;
		//This parameter causes LogonUser to create a primary token.
		const int LOGON32_LOGON_INTERACTIVE = 2;

		#region dll import

		[DllImport("advapi32.dll", SetLastError=true)]
		private static extern bool LogonUser(String lpszUsername, String lpszDomain, String lpszPassword, 
			int dwLogonType, int dwLogonProvider, ref IntPtr phToken);

		[DllImport("kernel32.dll", CharSet=CharSet.Auto)]
		private extern static bool CloseHandle(IntPtr handle);

		[DllImport("advapi32.dll", CharSet=CharSet.Auto, SetLastError=true)]
		private extern static bool DuplicateToken(IntPtr ExistingTokenHandle, 
			int SECURITY_IMPERSONATION_LEVEL, ref IntPtr DuplicateTokenHandle);

		#endregion

		private static WindowsImpersonationContext impersonatedUser;

		// If you incorporate this code into a DLL, be sure to demand FullTrust.
		[PermissionSetAttribute(SecurityAction.Demand, Name = "FullTrust")]
		public static void Impersonate(string userName, string domainName, string password)
		{	
			IntPtr tokenHandle = new IntPtr(0);
			IntPtr dupeTokenHandle = new IntPtr(0);
			try
			{
				// Get the user token for the specified user, domain, and password using the 
				// unmanaged LogonUser method.  
				// The local machine name can be used for the domain name to impersonate a user on this machine.

				tokenHandle = IntPtr.Zero;

				// Call LogonUser to obtain a handle to an access token.
				bool returnValue = LogonUser(userName, domainName, password, 
					LOGON32_LOGON_INTERACTIVE, LOGON32_PROVIDER_DEFAULT,
					ref tokenHandle);
					
				            
				if (false == returnValue)
				{
					int ret = Marshal.GetLastWin32Error();
					string error = string.Format(@"Impersonate user{0}\{1} failed.",domainName,userName);
					throw new System.ComponentModel.Win32Exception(ret);
				}

							
				// Use the token handle returned by LogonUser.
				WindowsIdentity newId = new WindowsIdentity(tokenHandle);
				impersonatedUser = newId.Impersonate();

			
				//impersonatedUser = impersonatedUser;

			}
			catch(Exception ex)
			{
				Console.WriteLine("Exception occurred. " + ex.Message);
			}
			finally
			{
				if (tokenHandle != IntPtr.Zero)
					CloseHandle(tokenHandle);
			}

		}


		public static void Revert()
		{
			impersonatedUser.Undo();
		}

		public static string CurrentRole
		{
			get
			{
				return WindowsIdentity.GetCurrent().Name;
			}
		}


	}
}
