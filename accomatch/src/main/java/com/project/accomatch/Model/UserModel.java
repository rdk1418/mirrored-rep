package com.project.accomatch.Model;

public class UserModel {

    private int userID;
    private String email;

//    public UserModel(String email, String name, String Password2, int age, String gender, String mobile, String address, int isAdmin, int isLeaseholder, Timestamp createdAt, Timestamp updatedAt) {
//        this.email = email;
//        this.name = name;
//        this.password = Password2;
//        this.age = age;
//        this.gender = gender;
//        this.mobile = mobile;
//        this.address = address;
//        this.is_admin = isAdmin;
//        this.is_leaseholder = isLeaseholder;
//        this.created_at = createdAt;
//        this.updated_at = updatedAt;
//    }

    private String name;
    private String password;
    private int age;
    private String gender;
    private String mobile;
    private String address;
    private int is_admin;
    private int is_leaseholder;
    public UserModel() {

    }

    public int getIs_admin() {
        return is_admin;
    }

    public void setIs_admin(int is_admin) {
        this.is_admin = is_admin;
    }

    public int getIs_leaseholder() {
        return is_leaseholder;
    }

    public void setIs_leaseholder(int is_leaseholder) {
        this.is_leaseholder = is_leaseholder;
    }


    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getIsAdmin() {
        return is_admin;
    }

    public void setIsAdmin(int isAdmin) {
        this.is_admin = isAdmin;
    }

    public int getIsLeaseholder() {
        return is_leaseholder;
    }

    public void setIsLeaseholder(int isLeaseholder) {
        this.is_leaseholder = isLeaseholder;
    }

}