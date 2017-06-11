package com.mpp.cms.service.errors;

public class UnsatisfiedPrerequisiteException extends RuntimeException {
    public UnsatisfiedPrerequisiteException() {
        super("You must complete course prerequisite before registration");
    }
}
